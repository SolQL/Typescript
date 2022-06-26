import { ethers } from "ethers";
import { Compiler } from "./Compiler";

class Query {
    ethersContractFactory: ethers.ContractFactory;
  
  
    constructor(fileName: string, contractName: string) {
      const compiler = new Compiler(fileName, contractName);
      this.ethersContractFactory = ethers.ContractFactory.fromSolidity(compiler.output);
    }
  }




export { Query };