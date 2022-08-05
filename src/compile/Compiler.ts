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








class StandaloneCompiler extends Compiler {
    compileFromTarget(targetName: string): Promise<string> {
      /*
        Takes a string as input
      */



        //Standard solidity compiler input format: https://docs.soliditylang.org/en/v0.5.0/using-the-compiler.html#compiler-input-and-output-json-description

        //recall: 1 .sol file can have multiple contract objects

        const sourceName = "query.sol";
        const content = 'import "lib.sol"; contract C { function f() public { L.f(); } }';

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

      var output: ICompilerOutput = JSON.parse(
        solc.compile(JSON.stringify(input), { import: this.findImports })
      );

      output.errors.map(error => console.log(error.formattedMessage))

      
      // `output` here contains the JSON output as specified in the documentation
      for (var contractName in output.contracts['query.sol']) {
        console.log(
          contractName +
            ': ' +
            output.contracts['query.sol'][contractName].evm.bytecode.object
        );
      }


      return new Promise((res, rej) => null);


    }



    findImports(path: string) {
        if (path === 'lib.sol')
        return {
          contents:
            'library L { function f() internal returns (uint) { return 7; } }'
        };
      else return { error: 'File not found' };
    }



}


export { Compiler, HardhatDependentCompiler, StandaloneCompiler };