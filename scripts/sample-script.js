
const hre = require("hardhat");
const { ethers } = require("ethers");
const solc = require("solc");
const fs = require("fs");


async function main() {
  const compilerOutput = getCompilerOutput('exampleQuery.sol', 'Query');

  const queryFactory = ethers.ContractFactory.fromSolidity(compilerOutput);
  const bytecode = queryFactory.bytecode;


  const Oracle = await hre.ethers.getContractFactory('Oracle');
  const oracle = await Oracle.deploy();


  const test = await oracle.callStatic.run(bytecode);

  console.log(ethers.utils.toUtf8String(test));
}



function getCompilerOutput(contractFilename, contractName) {

  const content = getContractContent(contractFilename);
  const input = `{"language":"Solidity","sources":{"${contractFilename}":{"content":${JSON.stringify(content)}}},"settings":{"outputSelection":{"*":{"*":["*"]}}}}`;
  const output = JSON.parse(solc.compile(input, { import: importCallback })).contracts[contractFilename][contractName];

  return output;
}



function getContractContent(contractFilename) {
  const content = fs.readFileSync(`contracts/${contractFilename}`).toString();
  return content;
}


function importCallback(contractFilename) {
  const contents = getContractContent(contractFilename);
  const output = (contents.length > 1) ? { contents } : { error: 'File not found'};
  return output;
}







main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
