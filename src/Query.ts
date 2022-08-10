import { ethers } from "ethers";
import { Oracle } from "./Oracle";
import { Compiler, HardhatDependentCompiler } from "./Compiler";
import { time } from "./Benchmark"



interface IQuery {
  oracle: Oracle
  compiler: Compiler | undefined
  run(): Promise<Object>
}



class Query implements IQuery {
  oracle: Oracle
  compiler: Compiler | undefined
  targetName: string
  hre: any
  
  constructor(targetName: string, chainID: string, provider: ethers.providers.Provider, hre: any, compiler?: Compiler) {
    this.oracle = new Oracle(chainID, provider);
    this.compiler = compiler;
    this.targetName = targetName;
    this.hre = hre;
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
  constructor(targetName: string, chainID: string, provider: ethers.providers.Provider, hre: any) {
    super(targetName, chainID, provider, hre);
    this.compiler = new HardhatDependentCompiler(hre);
  }
}




export {
  Query,
  HardhatDependentQuery
};