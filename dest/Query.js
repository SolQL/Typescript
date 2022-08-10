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
exports.HardhatDependentQuery = exports.Query = void 0;
const Oracle_1 = require("./Oracle");
const Compiler_1 = require("./Compiler");
class Query {
    constructor(targetName, chainID, provider, hre, compiler) {
        this.oracle = new Oracle_1.Oracle(chainID, provider);
        this.compiler = compiler;
        this.targetName = targetName;
        this.hre = hre;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.compiler === undefined) {
                throw new Error("Compiler not set.");
            }
            const bytecode = yield this.compiler.compileFromTarget(this.targetName);
            const rawQueryResult = yield this.oracle.runQuery(bytecode);
            return rawQueryResult;
        });
    }
}
exports.Query = Query;
class HardhatDependentQuery extends Query {
    constructor(targetName, chainID, provider, hre) {
        super(targetName, chainID, provider, hre);
        this.compiler = new Compiler_1.HardhatDependentCompiler(hre);
    }
}
exports.HardhatDependentQuery = HardhatDependentQuery;
