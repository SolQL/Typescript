import { ethers } from "ethers";
import { Oracle } from "./Oracle";
import { Compiler, HardhatDependentCompiler } from "./compile/Compiler";

import { default as h } from "hardhat";
const hre: any = h;


interface IQuery {
  oracle: Oracle
  compiler: Compiler | undefined
  run(): Promise<Object>
}



class Query implements IQuery {
  oracle: Oracle
  compiler: Compiler | undefined
  targetName: string
  
  constructor(targetName: string, chainID: string, provider: ethers.providers.Provider, compiler?: Compiler) {
    this.oracle = new Oracle(chainID, provider);
    this.compiler = compiler;
    this.targetName = targetName;
  }


  async run() {
    if(this.compiler === undefined) {
      throw new Error("Compiler not set.")
    }

    const bytecode = await this.compiler.compileFromTarget(this.targetName);
    const rawQueryResult = await this.oracle.runQuery(bytecode);
    return rawQueryResult;
  }

}







class HardhatDependentQuery extends Query {
  constructor(targetName: string, chainID: string, provider: ethers.providers.Provider) {
    super(targetName, chainID, provider);
    this.compiler = new HardhatDependentCompiler();
  }
}




export {
  Query,
  HardhatDependentQuery
};