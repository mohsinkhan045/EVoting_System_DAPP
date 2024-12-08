require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/58e588fa4e4948d2ba07861c01d03a3f`,
      accounts: [
        `ba76e19019363e78fcea3d623eb956cfabccef7ec0ba792db735560eb4baaaa6`,
      ],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: `MH5BCDP4R8UI2UYZSHXFWYRDQVIZTV4UBE`,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};
