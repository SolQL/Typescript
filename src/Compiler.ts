
import { ContractCompatibilityError } from './Errors';



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



function contractIsQueryContract(contractFactory: any) {
    const functionFragment = contractFactory.interface.functions['query()'];

    if(functionFragment === undefined) {
        throw new ContractCompatibilityError();
    }

    const name = functionFragment.name;

    if(name === undefined) {
        throw new ContractCompatibilityError();
    }

    const outputs = functionFragment.outputs;

    if(outputs.length !== 1) {
        throw new ContractCompatibilityError();
    }

    if(outputs[0].type !== 'bytes') {
        throw new ContractCompatibilityError();
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
        .then((contractFactory: any) => {
            contractIsQueryContract(contractFactory);
            return contractFactory.bytecode;
        })
        .catch((error: Error) => {
            console.error(error)
        })

        return bytecodePromise;
    }


}



export { Compiler, HardhatDependentCompiler };