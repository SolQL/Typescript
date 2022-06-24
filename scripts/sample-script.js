
const hre = require("hardhat");
const { ethers } = require("ethers");
const solc = require("solc");
const fs = require("fs");


async function main() {
  getContractBytecode('exampleQuery.sol');
}



function getContractBytecode(contractFilename) {
  const content = getContractContent(contractFilename);



  var input = {
    language: 'Solidity',
    sources: {
      'test.sol': {
        content
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
  
  var output = JSON.parse(solc.compile(JSON.stringify(input), { import: importCallback }));
  
  // `output` here contains the JSON output as specified in the documentation


  console.log(output);
/*   for (var contractName in output.contracts['test.sol']) {
    console.log(
      contractName +
        ': ' +
        output.contracts['test.sol'][contractName].evm.bytecode.object
    );
  }*/




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
