require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });
/** @type import('hardhat/config').HardhatUserConfig */


const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ALCHEMY_HTTP_URL = process.env.ALCHEMY_URL;

module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork: "goerli",
    networks: {
      hardhat: {},
      goerli: {
        url: ALCHEMY_HTTP_URL,
        accounts: [PRIVATE_KEY]
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
