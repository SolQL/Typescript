import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers } from "ethers";
import { SolQL } from "./SolQL";
import { HardhatConfigError } from "./Errors";


/*
    Arguements passed through the cli for usage in the solql hardhat task.
*/
interface pluginArgs {
    contractName: string
    networkName: string
}





/*
    Is called when "npx hardhat solql --contract-name <name> --network-name <network>" is run.
*/
async function solqlAction(args: pluginArgs, hre: HardhatRuntimeEnvironment) {

    const { contractName, networkName } = args;


    const providerLink = getProviderUrl(hre, networkName);
    
    const provider = new ethers.providers.JsonRpcProvider(providerLink);
    const chainId = ((await provider.getNetwork()).chainId).toString();


    const solql = new SolQL(contractName, chainId, provider, hre);
    const result = await solql.query.run();
    console.log(result);
    return result;
}






/*
    Is the hardhat task added to the config file which defines npx hardhat solql .. commands.
*/
function addSolQLPlugin() {
    task("solql", async  (args: pluginArgs, hre: HardhatRuntimeEnvironment) => solqlAction(args, hre))
    .addParam('contractName', 'The query contract name')
    .addParam('networkName', 'Name of network as specified in your hardhat config file')
}









/*
    Is called within the defined hardhat solql task to retrieve the provider url.
*/
function getProviderUrl(hre: HardhatRuntimeEnvironment, networkName: string): string {
    if(hre.userConfig === undefined) {
        throw new HardhatConfigError('Could not find hardhat.config.js file.');
    }

    else if(hre.userConfig.networks == undefined) {
        throw new HardhatConfigError('Could not find networks field of hardhat.config.js file.');
    }

    const providerInfo: any = hre.userConfig.networks[networkName];

    if(providerInfo === undefined){
        throw new HardhatConfigError(`${networkName} not specified in your hardhat.config.js file.`);
    }

    const providerLink: string = providerInfo.url;

    if(providerLink === undefined) {
        throw new HardhatConfigError(`Provider url for ${networkName} not found in your hardhat.config.js file.`)
    }

    return providerLink;
}


export { addSolQLPlugin };

