const { ethers } = require("hardhat");

async function main() {
  const [] = await ethers.getSigners();
  const Token = await ethers.getContractFactory("VotingSystem");
  const token = await Token.deploy(10000, 18);
  await token.deployed();
  console.log("Token address: ", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
