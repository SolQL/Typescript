const { ethers } = require("ethers");
const { Query } = require("../dest/exports");


async function main() {
  const query = new Query("exampleQuery.sol", "Query", "0x00000000006c3852cbEf3e08E8dF289169EdE581", new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL));
}








main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
