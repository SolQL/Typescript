import { ethers } from "ethers";
import { Compiler } from "./Compiler";

class Query {
    ethersContractFactory: ethers.ContractFactory;
    oracle: ethers.Contract;

    constructor(fileName: string, contractName: string, oracleAddress: string, provider: ethers.providers.Provider) {
      const compiler = new Compiler(fileName, contractName);
      this.ethersContractFactory = ethers.ContractFactory.fromSolidity(compiler.output);
      this.oracle = new ethers.Contract(oracleAddress, ["function run(bytes memory) external returns(bytes memory)"], provider);
    }

    async run() {
      const bytecode = this.ethersContractFactory.bytecode;
      const result = await this.oracle.callStatic.run(bytecode);
      return result;
    }
  }




export { Query };