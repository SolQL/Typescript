
class HardhatConfigError extends Error{
    constructor(message: string) {
        super(`Hardhat config error: ${message}`);
    }
}
