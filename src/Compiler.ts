const solc = require('solc');



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
      Needs to recieve hre as a constructor arguement when
      hre is loaded. (cannot import hre inside the hardhat.config.js file).
    */

    hre: any;

    constructor(hre: any) {
      super();
      this.hre = hre;
    }

    async compileFromTarget(targetName: string): Promise<string> {
        const bytecodePromise = this.hre.ethers.getContractFactory(targetName)
        .then((contractFactory: any) => contractFactory.bytecode)
        .catch((error: Error) => {
            console.error(error)
        })

        return bytecodePromise;
    }


}




class StandaloneCompiler extends Compiler {
  /*
    UNDER DEVELOPMENT.
    To be used to compile queries independlty of hardhat.
  */
    compileFromTarget(targetName: string): Promise<string> {
        var input = {
            language: 'Solidity',
            sources: {
              'test.sol': {
                content: 'import "lib.sol"; contract C { function f() public { L.f(); } }'
              }
            },
            settings: {
              outputSelection: {
                '*': {
                  '*': ['*']
                }
              }
            }
          };


          



          
          // New syntax (supported from 0.5.12, mandatory from 0.6.0)
          var output = JSON.parse(
            solc.compile(JSON.stringify(input), { import: this.findImports })
          );




          
          // `output` here contains the JSON output as specified in the documentation
          for (var contractName in output.contracts['test.sol']) {
            console.log(
              contractName +
                ': ' +
                output.contracts['test.sol'][contractName].evm.bytecode.object
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