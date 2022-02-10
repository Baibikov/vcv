async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploy donate-contract with deployer address: ${deployer.address}`);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    const Donate = await ethers.getContractFactory("Donate");
    const donateDeploy = await Donate.deploy();

    console.log(`Donate Contract address: ${donateDeploy.address}`);
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });