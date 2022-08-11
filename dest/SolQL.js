"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolQL = void 0;
const Query_1 = require("./Query");
const Compiler_1 = require("./Compiler");
class SolQL {
    constructor(targetName, chainID, provider, hre) {
        const compiler = new Compiler_1.HardhatDependentCompiler(hre);
        this.query = new Query_1.HardhatDependentQuery(targetName, chainID, provider, compiler);
    }
}
exports.SolQL = SolQL;
