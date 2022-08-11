"use strict";
class HardhatConfigError extends Error {
    constructor(message) {
        super(`Hardhat config error: ${message}`);
    }
}
