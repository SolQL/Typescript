import { Query, HardhatDependentQuery } from "./Query";
import { HardhatDependentCompiler } from "./Compiler";
import { ethers } from "ethers";




class SolQL {
    query: Query
    constructor(targetName: string, chainID: string, provider: ethers.providers.Provider, hre: any) {
        const compiler = new HardhatDependentCompiler(hre);
        this.query = new HardhatDependentQuery(targetName, chainID, provider, compiler);
    }
}



export { SolQL }



