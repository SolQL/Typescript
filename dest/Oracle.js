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
exports.OracleContract = void 0;
const ethers_1 = require("ethers");
const ORACLE_CONSTANTS = {
    abi: ["function run(bytes memory) external returns(bytes memory)"],
    //chainid: address 
    getAddress(chainID) {
        const addresses = {
            "5": "0x3db0fB82e35765b788558cAf538D68b60F4fEE98"
        };
        return addresses[chainID];
    }
};
class OracleContract {
    constructor(chainID, provider) {
        this.contractObject = new ethers_1.ethers.Contract(ORACLE_CONSTANTS.getAddress(chainID), ORACLE_CONSTANTS.abi, provider);
    }
    runQuery(queryBytecode) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawQueryResult = yield this.contractObject.callStatic.run(queryBytecode);
            return rawQueryResult;
        });
    }
}
exports.OracleContract = OracleContract;
