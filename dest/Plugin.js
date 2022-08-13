"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSolQLPlugin = void 0;
const config_1 = require("hardhat/config");
const ethers_1 = require("ethers");
const SolQL_1 = require("./SolQL");
const Errors_1 = require("./Errors");
/*
    Is called when "npx hardhat solql --contract-name <name> --network-name <network>" is run.
*/
function solqlAction(args, hre) {
    return __awaiter(this, void 0, void 0, function* () {
        const { contractName, networkName } = args;
        const providerLink = getProviderUrl(hre, networkName);
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(providerLink);
        const chainId = ((yield provider.getNetwork()).chainId).toString();
        const solql = new SolQL_1.SolQL(contractName, chainId, provider, hre);
        const result = yield solql.query.run();
        console.log(result);
        return result;
    });
}
/*
    Is the hardhat task added to the config file which defines npx hardhat solql .. commands.
*/
function addSolQLPlugin() {
    (0, config_1.task)("solql", (args, hre) => __awaiter(this, void 0, void 0, function* () { return solqlAction(args, hre); }))
        .addParam('contractName', 'The query contract name')
        .addParam('networkName', 'Name of network as specified in your hardhat config file');
}
exports.addSolQLPlugin = addSolQLPlugin;
/*
    Is called within the defined hardhat solql task to retrieve the provider url.
*/
function getProviderUrl(hre, networkName) {
    if (hre.userConfig === undefined) {
        throw new Errors_1.HardhatConfigError('Could not find hardhat.config.js file.');
    }
    else if (hre.userConfig.networks == undefined) {
        throw new Errors_1.HardhatConfigError('Could not find networks field of hardhat.config.js file.');
    }
    const providerInfo = hre.userConfig.networks[networkName];
    if (providerInfo === undefined) {
        throw new Errors_1.HardhatConfigError(`${networkName} not specified in your hardhat.config.js file.`);
    }
    const providerLink = providerInfo.url;
    if (providerLink === undefined) {
        throw new Errors_1.HardhatConfigError(`Provider url for ${networkName} not found in your hardhat.config.js file.`);
    }
    return providerLink;
}
