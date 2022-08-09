import { default as h } from "hardhat";
const solc = require('solc');
const hre: any = h;


/*
    Target can be either the contracts name in case of the HardhatDependent implementation, or the directory of the file containing the contract.
*/
interface ICompiler {
    compileFromTarget(targetName: string) : Promise<string>
}






/*
    Wrapper class for full compiler implementations.
*/
class Compiler implements ICompiler {
    compileFromTarget(targetName: string): Promise<string> {
        return new Promise((resolve, reject) => null);
    }
}







class HardhatDependentCompiler extends Compiler {

    /*
        Since we do not care about anything other than the bytecode, since
        the bytecode is the only component we send to the Oracle contract, 
        we discard the ContractFactory object and only keep the bytecode. 
    */
    async compileFromTarget(targetName: string): Promise<string> {
        const bytecodePromise = hre.ethers.getContractFactory(targetName)
        .then((contractFactory: any) => contractFactory.bytecode)
        .catch((error: Error) => {
            console.error(error)
        })

        return bytecodePromise;
    }


}








class StandaloneCompiler {
    compileFromString(sourceName: string, content: string): void {
      /*
        Takes a string as input
      */

        //Standard solidity compiler input format: https://docs.soliditylang.org/en/v0.5.0/using-the-compiler.html#compiler-input-and-output-json-description

        //recall: 1 .sol file can have multiple contract objects

        const sources: ICompilerInputSources = {};
        sources[sourceName] = {content};

        const input: ICompilerInputJson  = {
          language: 'Solidity',
          sources,
          settings: {
            outputSelection: {
              '*' : {
                '*': ['*']
              }
            }
          }
        }
          
      // New syntax (supported from 0.5.12, mandatory from 0.6.0)
      //example using import callback function

      var output: ICompilerOutput = this.solcCompile(input, solc);
      console.log(output)
/*       var output: ICompilerOutput;

      solc.loadRemoteVersion('0.6.0', (err: any, solcSnapshot: any) => {
        if(err) {
          console.log(err);
          return;
        }
        else{
          output = this.solcCompile(input, solcSnapshot);
          console.log(output);
        }
      }); */




    }



    findImports(path: string) {
        if (path === 'lib.sol')
        return {
          contents:
            'library L { function f() internal returns (uint) { return 7; } }'
        };
      else return { error: 'File not found' };
    }


    solcCompile(input: ICompilerInputJson, solcSnapshot: any) {
      const stringifiedInput = JSON.stringify(input);
      const stringifiedOutput = solcSnapshot.compile(stringifiedInput, { import: this.findImports });

      const output: ICompilerOutput = JSON.parse(stringifiedOutput);
      return output;
    }



    logCompilerErrors(output: ICompilerOutput) {
      for(let i = 0; i < output.errors.length; i++) {
        console.log(output.errors[i]);
      }



    }



}


export { Compiler, HardhatDependentCompiler, StandaloneCompiler };