const { ethers } = require("hardhat");
const hre = require("hardhat");
require("dotenv").config();


//0xe58296790440187Ef73Af8eb4f88c353f8393484 


async function main() {
    const Oracle = await hre.ethers.getContractFactory("Oracle");
    const prov = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
    const wal = new ethers.Wallet(process.env.GOERLI_PRIVATE_KEY, prov);
    const newOracle = Oracle.connect(wal);
    const oracle = await newOracle.deploy();
    console.log(oracle.address);
    await oracle.deployed();
}








main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});