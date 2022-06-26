"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const ethers_1 = require("ethers");
const Compiler_1 = require("./Compiler");
class Query {
    constructor(fileName, contractName) {
        const compiler = new Compiler_1.Compiler(fileName, contractName);
        this.ethersContractFactory = ethers_1.ethers.ContractFactory.fromSolidity(compiler.output);
    }
}
exports.Query = Query;
