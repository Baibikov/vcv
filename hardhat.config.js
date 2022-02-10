require('dotenv').config();
require("chai");


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.11",
  paths: {
    artifacts: './artifacts/contracts'
  },
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL,
      accounts: [
        process.env.PRIVATE_KEY
      ]
    }
  }
};

