//const prompt = require('prompt-sync')();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying access controls with the account:",
    await deployer.getAddress()
  );

  const HashtagAccessControls = await ethers.getContractFactory("HashtagAccessControls");

  const accessControls = await HashtagAccessControls.deploy();

  await accessControls.deployed();

  console.log(`Access controls deployed at: `, accessControls.address);

  console.log('Finished!');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
