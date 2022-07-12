const { ethers } = require("ethers");
const { Query } = require("../dest/exports");

//const hre = require("hardhat");
const oracleAddress = "0x3db0fB82e35765b788558cAf538D68b60F4fEE98"

async function main() {

  const Query = await hre.ethers.getContractFactory('Query');
  
  const oracle = new ethers.Contract(oracleAddress, ['function run(bytes memory bytecode) external returns(bytes memory result)'], new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL));
  const result = await oracle.callStatic.run(Query.bytecode);
  console.log(result);
}


async function main2() {
  const query = new Query("../contracts/exampleQuery.sol", "Query", oracleAddress);
}








main2()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });