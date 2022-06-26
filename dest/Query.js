"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const ethers_1 = require("ethers");
const Compiler_1 = require("./Compiler");
class Query {
    constructor(fileName, contractName, oracleAddress, provider) {
        const compiler = new Compiler_1.Compiler(fileName, contractName);
        this.ethersContractFactory = ethers_1.ethers.ContractFactory.fromSolidity(compiler.output);
        this.oracle = new ethers_1.ethers.Contract(oracleAddress, ["function run(bytes memory) external returns(bytes memory)"], provider);
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const bytecode = this.ethersContractFactory.bytecode;
            const result = yield this.oracle.callStatic.run(bytecode);
            return result;
        });
    }
}
exports.Query = Query;
