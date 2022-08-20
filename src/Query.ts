import { ethers } from "ethers";
import { Oracle } from "./Oracle";
import { Compiler, HardhatDependentCompiler } from "./Compiler";




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





/*
  Only difference between HardhatDependentQuery and Query, is the former takes a HardhatDependentCompiler whereas
  the latter takes any compiler.
*/

class HardhatDependentQuery extends Query {
  constructor(targetName: string, chainID: string, provider: ethers.providers.Provider, compiler: HardhatDependentCompiler) {
    super(targetName, chainID, provider, compiler);
  }
}




export {
  Query,
  HardhatDependentQuery
};