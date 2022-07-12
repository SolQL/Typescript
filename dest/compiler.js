"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = void 0;
const solc_1 = __importDefault(require("solc"));
const fs_1 = __importDefault(require("fs"));
class Compiler {
    constructor(fileName, contractName) {
        this.fileName = fileName;
        this.contractName = contractName;
        this.output = this.getCompilerOutput();
    }
    getCompilerOutput() {
        const content = this.getContractContent();
        const input = `{"language":"Solidity","sources":{"${this.fileName}":{"content":${JSON.stringify(content)}}},"settings":{"outputSelection":{"*":{"*":["*"]}}}}`;
        const compilerOutputObject = JSON.parse(solc_1.default.compile(input, { import: this.importCallback }));
        console.log(compilerOutputObject);
        const output = compilerOutputObject.contracts[this.fileName][this.contractName];
        return output;
    }
    getContractContent() {
        console.log(process.cwd());
        const content = fs_1.default.readFileSync(`${this.fileName}`).toString();
        return content;
    }
    importCallback() {
        const contents = this.getContractContent();
        const output = (contents.length > 1) ? { contents } : { error: 'File not found' };
        return output;
    }
}
exports.Compiler = Compiler;
