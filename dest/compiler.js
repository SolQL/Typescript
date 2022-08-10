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
exports.StandaloneCompiler = exports.HardhatDependentCompiler = exports.Compiler = void 0;
const solc = require('solc');
/*
    Wrapper class for full compiler implementations.
*/
class Compiler {
    constructor(hre) {
        this.hre = hre;
    }
    compileFromTarget(targetName) {
        return new Promise((resolve, reject) => null);
    }
}
exports.Compiler = Compiler;
class HardhatDependentCompiler extends Compiler {
    /*
        Since we do not care about anything other than the bytecode, since
        the bytecode is the only component we send to the Oracle contract,
        we discard the ContractFactory object and only keep the bytecode.
    */
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
class StandaloneCompiler extends Compiler {
    compileFromTarget(targetName) {
        var input = {
            language: 'Solidity',
            sources: {
                'test.sol': {
                    content: 'import "lib.sol"; contract C { function f() public { L.f(); } }'
                }
            },
            settings: {
                outputSelection: {
                    '*': {
                        '*': ['*']
                    }
                }
            }
        };
        // New syntax (supported from 0.5.12, mandatory from 0.6.0)
        var output = JSON.parse(solc.compile(JSON.stringify(input), { import: this.findImports }));
        // `output` here contains the JSON output as specified in the documentation
        for (var contractName in output.contracts['test.sol']) {
            console.log(contractName +
                ': ' +
                output.contracts['test.sol'][contractName].evm.bytecode.object);
        }
        return new Promise((res, rej) => null);
    }
    findImports(path) {
        if (path === 'lib.sol')
            return {
                contents: 'library L { function f() internal returns (uint) { return 7; } }'
            };
        else
            return { error: 'File not found' };
    }
}
exports.StandaloneCompiler = StandaloneCompiler;
