const prompt = require('prompt-sync')();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying nft registry with the account:",
    await deployer.getAddress()
  );

  const accessControlsAddress = prompt('Access Controls Address? ');
  const protocolAddress = prompt('Protocol Address? ')

  console.log('\nAccess Controls Address: ', accessControlsAddress)
  console.log('Protocol Address: ', protocolAddress)
  console.log('\n')

  prompt('If happy, hit enter to continue...')

  const ERC721HashtagRegistry = await ethers.getContractFactory("ERC721HashtagRegistry");

  const registry = await ERC721HashtagRegistry.deploy(
    accessControlsAddress,
    protocolAddress
  );

  await registry.deployed();

  console.log(`Registry deployed at: `, registry.address);

  console.log('Finished!');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
