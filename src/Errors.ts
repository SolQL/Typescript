
class HardhatConfigError {
    constructor(message: string) {
        console.log("\x1b[31m", `Hardhat config error: ${message}`);
        return Error();
    }
}


class ContractCompatibilityError {
    constructor() {
        console.log("\x1b[31m", 'The contract you are trying to query does not contain a "query() external returns(bytes result)" function.');
        return Error();
    }
}


export {
    HardhatConfigError,
    ContractCompatibilityError
};