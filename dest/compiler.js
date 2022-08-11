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
exports.HardhatDependentCompiler = exports.Compiler = void 0;
const solc = require('solc');
/*
    Wrapper class for full compiler implementations.
*/
class Compiler {
    compileFromTarget(targetName) {
        return new Promise((resolve, reject) => null);
    }
}
exports.Compiler = Compiler;
class HardhatDependentCompiler extends Compiler {
    constructor(hre) {
        super();
        this.hre = hre;
    }
    compileFromTarget(targetName) {
        return __awaiter(this, void 0, void 0, function* () {
            const bytecodePromise = this.hre.ethers.getContractFactory(targetName)
                .then((contractFactory) => contractFactory.bytecode)
                .catch((error) => {
                console.error(error);
            });
            return bytecodePromise;
        });
    }
}
exports.HardhatDependentCompiler = HardhatDependentCompiler;
