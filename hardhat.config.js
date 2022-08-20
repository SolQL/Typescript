require("@nomiclabs/hardhat-waffle");
require("dotenv").config();


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.5.16",
  networks: {

    hardhat: {
      forking: {
        url: process.env.GOERLI_URL
      }
    },

    goerli: {
      url: process.env.GOERLI_URL,
      //accounts: [ process.env.GOERLI_PRIVATE_KEY ]
    }
  }
};
