const { ethers } = require("ethers");
const {
  Query,
  HardhatDependentQuery,
  HardhatDependentCompiler,
  Oracle,
  SolQL
} = require("../dest/index");






async function testHardhatDependentCompiler(queryContractName) {
  const compiler = new HardhatDependentCompiler();
  const bytecode = await compiler.compileFromTarget(queryContractName);

  //Only a visual inspection of compiled bytecode. Correctness of compilation not tested. 
  console.log(bytecode);
  return bytecode;
}





async function testOracle(providerUrl, chainId) {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const oracle = new Oracle(chainId, provider);
  console.log(oracle.contractObject);
}



async function testQuery(providerUrl, queryContractName, chainId) {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  const compiler = new HardhatDependentCompiler();
  const query = new Query(queryContractName, chainId, provider, compiler);
  const result = await query.run();
  
  return result;
}



async function testHardhatDependentQuery(providerUrl, queryContractName, chainId) {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const compiler = new HardhatDependentCompiler(hre);
  const query = new HardhatDependentQuery(queryContractName, chainId, provider, compiler);

  const result = await query.run();
  return result;
}


async function testSolQL(providerUrl, queryContractName, chainId, hre) {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const solql = new SolQL(queryContractName, chainId, provider, hre);
  const result = await solql.query.run();

  return result;
}






module.exports = { testHardhatDependentQuery, testSolQL };