
const hre = require("hardhat");

async function main() {
  const Query = await hre.ethers.getContractFactory("Query");
  const query = await Query.deploy();

  await query.deployed();

  console.log("Query deployed to:", query.address);

}






main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
