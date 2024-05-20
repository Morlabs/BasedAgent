// deploy.js
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Contract Factory
    const BAAGToken = await ethers.getContractFactory("BAAGToken");

    // Define pool addresses (replace with actual addresses)
    const capitalPoolAddress = "0xCapitalPoolAddress"; // Replace with actual address
    const codersPoolAddress = "0xCodersPoolAddress"; // Replace with actual address
    const communityPoolAddress = "0xCommunityPoolAddress"; // Replace with actual address
    const protectionPoolAddress = "0xProtectionPoolAddress"; // Replace with actual address

    // Deploy Contract
    const baagToken = await BAAGToken.deploy(
        capitalPoolAddress,
        codersPoolAddress,
        communityPoolAddress,
        protectionPoolAddress
    );

    await baagToken.deployed();

    console.log("BAAGToken deployed to:", baagToken.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
