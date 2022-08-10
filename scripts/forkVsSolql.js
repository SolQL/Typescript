const { testHardhatDependentQuery } = require('./tests')
const { time } = require('../dest/benchmark');
const hre = require('hardhat');


async function main() {
    const firstResult = await time(() => testHardhatDependentQuery(process.env.GOERLI_URL, "Query", "5"), 'solql time');

    const hardhatFork = await time(hardhatForking, 'hardhat forking time');

    console.log(firstResult);
    console.log(hardhatFork);
}



async function hardhatForking() {

    const Query = await hre.ethers.getContractFactory('Query');
    const query = await Query.deploy();

    const result = await query.callStatic.query();

    return result;

}



main()
.catch(error => console.error(error))