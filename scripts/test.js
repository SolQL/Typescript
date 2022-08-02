const { ethers } = require("ethers");
const {
  Query,
  HardhatDependentQuery,
  HardhatDependentCompiler,
  Oracle,
  StandaloneCompiler
} = require("../dest/index");


async function main() {
  /*
  const result = await testQuery(process.env.GOERLI_URL, "Query", "5");
  console.log(result);
  */



  /* 
  const result = await testHardhatDependentQuery(process.env.GOERLI_URL, "Query", "5");
  console.log(result);
  */
}





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
  const query = new HardhatDependentQuery(queryContractName, chainId, provider);

  const result = await query.run();
  return result;
}





main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });