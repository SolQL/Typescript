const { ethers } = require("ethers");
const { Query, HardhatDependentCompiler } = require("../dest/exports");

const hre = require("hardhat");

const oracleAddress = "0x3db0fB82e35765b788558cAf538D68b60F4fEE98";




async function main() {
  await testHardhatDependentCompiler();
}



async function testHardhatDependentCompiler() {
  const compiler = new HardhatDependentCompiler();
  const bytecode = await compiler.compileFromTarget("Query");

  //Only a visual inspection of compiled bytecode. Correctness of compilation not tested. 
  console.log(bytecode);
  return bytecode;
}






main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });