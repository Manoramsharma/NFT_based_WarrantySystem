require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks :{
    goerli: {
      url : "https://eth-goerli.g.alchemy.com/v2/2nv0KhMgeGXV5JQgpILM_xad4JR9qblQ",
      accounts : ['e982696e8eb6b5d2570c6e0b210205101071189ebe886c2d1e63d6d128a9631a']
    }
  }
};
