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
    const content = this.getContractContent();
    const input = `{"language":"Solidity","sources":{"${this.fileName}":{"content":${JSON.stringify(content)}}},"settings":{"outputSelection":{"*":{"*":["*"]}}}}`;
    
    const compilerOutputObject = JSON.parse(solc.compile(input, { import: this.importCallback }));
    console.log(compilerOutputObject);
    const output = compilerOutputObject.contracts[this.fileName][this.contractName];
  
    return output;
  }


  getContractContent(): string {
    console.log(process.cwd());
    const content = fs.readFileSync(`${this.fileName}`).toString();
    return content;
  }


  importCallback(): object {
    const contents = this.getContractContent();
    const output = (contents.length > 1) ? { contents } : { error: 'File not found'};
    return output;
  }
}


export { Compiler };
  
  
  

  
  
