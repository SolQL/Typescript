"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractCompatibilityError = exports.HardhatConfigError = void 0;
class HardhatConfigError {
    constructor(message) {
        console.log("\x1b[31m", `Hardhat config error: ${message}`);
        return Error();
    }
}
exports.HardhatConfigError = HardhatConfigError;
class ContractCompatibilityError {
    constructor() {
        console.log("\x1b[31m", 'The contract you are trying to query does not contain a "query() external returns(bytes result)" function.');
        return Error();
    }
}
exports.ContractCompatibilityError = ContractCompatibilityError;
