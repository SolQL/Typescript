import solc from "solc";
import fs from "fs";




class Compiler {
  fileName: string;
  contractName: string;
  output: Object;

  constructor(fileName: string, contractName: string) {
    this.fileName = fileName;
    this.contractName = contractName;
    this.output = this.getCompilerOutput();
  }

  getCompilerOutput() {
    const content = this.getContractContent(this.fileName);
    const input = `{"language":"Solidity","sources":{"${this.fileName}":{"content":${JSON.stringify(content)}}},"settings":{"outputSelection":{"*":{"*":["*"]}}}}`;
    const output = JSON.parse(solc.compile(input, { import: this.importCallback })).contracts[this.fileName][this.contractName];
  
    return output;
  }


  getContractContent(fileName: string): string {
    const content = fs.readFileSync(`contracts/${this.fileName}`).toString();
    return content;
  }


  importCallback(fileName: string): object {
    const contents = this.getContractContent(fileName);
    const output = (contents.length > 1) ? { contents } : { error: 'File not found'};
    return output;
  }
}


export { Compiler };
  
  
  

  
  
