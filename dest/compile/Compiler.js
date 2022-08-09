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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandaloneCompiler = exports.HardhatDependentCompiler = exports.Compiler = void 0;
const hardhat_1 = __importDefault(require("hardhat"));
const solc = require('solc');
const hre = hardhat_1.default;
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
    /*
        Since we do not care about anything other than the bytecode, since
        the bytecode is the only component we send to the Oracle contract,
        we discard the ContractFactory object and only keep the bytecode.
    */
    compileFromTarget(targetName) {
        return __awaiter(this, void 0, void 0, function* () {
            const bytecodePromise = hre.ethers.getContractFactory(targetName)
                .then((contractFactory) => contractFactory.bytecode)
                .catch((error) => {
                console.error(error);
            });
            return bytecodePromise;
        });
    }
}
exports.HardhatDependentCompiler = HardhatDependentCompiler;
class StandaloneCompiler {
    compileFromString(sourceName, content) {
        /*
          Takes a string as input
        */
        //Standard solidity compiler input format: https://docs.soliditylang.org/en/v0.5.0/using-the-compiler.html#compiler-input-and-output-json-description
        //recall: 1 .sol file can have multiple contract objects
        const sources = {};
        sources[sourceName] = { content };
        const input = {
            language: 'Solidity',
            sources,
            settings: {
                outputSelection: {
                    '*': {
                        '*': ['*']
                    }
                }
            }
        };
        // New syntax (supported from 0.5.12, mandatory from 0.6.0)
        //example using import callback function
        var output = this.solcCompile(input, solc);
        console.log(output);
        /*       var output: ICompilerOutput;
        
              solc.loadRemoteVersion('0.6.0', (err: any, solcSnapshot: any) => {
                if(err) {
                  console.log(err);
                  return;
                }
                else{
                  output = this.solcCompile(input, solcSnapshot);
                  console.log(output);
                }
              }); */
    }
    findImports(path) {
        if (path === 'lib.sol')
            return {
                contents: 'library L { function f() internal returns (uint) { return 7; } }'
            };
        else
            return { error: 'File not found' };
    }
    solcCompile(input, solcSnapshot) {
        const stringifiedInput = JSON.stringify(input);
        const stringifiedOutput = solcSnapshot.compile(stringifiedInput, { import: this.findImports });
        const output = JSON.parse(stringifiedOutput);
        return output;
    }
    logCompilerErrors(output) {
        for (let i = 0; i < output.errors.length; i++) {
            console.log(output.errors[i]);
        }
    }
}
exports.StandaloneCompiler = StandaloneCompiler;
