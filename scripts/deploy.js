const { ethers } = require("hardhat");

async function main() {
  const PayClikContract = await ethers.getContractFactory("PayClik");
  const PayClikContractDeployed = await PayClikContract.deploy();
  await PayClikContractDeployed.deployed();

  console.log(`Contract Address:  ${PayClikContractDeployed.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
