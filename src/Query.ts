import { ethers } from "ethers";

import { default as h } from "hardhat";
const hre: any = h;




class Query {
    bytecode: string;
    oracle: ethers.Contract;

    constructor(bytecode: string, oracleAddress: string, provider: ethers.providers.Provider) {
      this.oracle = new ethers.Contract(oracleAddress, ["function run(bytes memory) external returns(bytes memory)"], provider);
      this.bytecode = bytecode;
      return this;
    }

    static async runFromContract(contractName: string, oracleAddress: string, provider: ethers.providers.Provider) {
      const bytecode = (await hre.ethers.getContractFactory(contractName)).bytecode;
      const query = new Query(bytecode, oracleAddress, provider);
      const result = query.run();
      return result;
    }


    async run() {
      const result = await this.oracle.callStatic.run(this.bytecode);
      return result;
    }



  }




export { Query };