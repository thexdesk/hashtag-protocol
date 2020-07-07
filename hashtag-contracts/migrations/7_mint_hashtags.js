const {getAccountAddress} = require('@blockrocket/utils');

const MNEMONIC = process.env.PROTOTYPE_BR_KEY || '';
const INFURA_KEY = process.env.PROTOTYPE_BR_INFURA_KEY || '';

const HashtagProtocol = artifacts.require('HashtagProtocol');

module.exports = async function (deployer, network, accounts) {
    console.log('Adding publisher access controls to network: ' + network);

    const creator = getAccountAddress(accounts, 0, network, MNEMONIC, INFURA_KEY);
    const alice = getAccountAddress(accounts, 1, network, MNEMONIC, INFURA_KEY);
    const bob = getAccountAddress(accounts, 2, network, MNEMONIC, INFURA_KEY);

    const hashtagProtocol = await HashtagProtocol.deployed();

    const fee = await hashtagProtocol.fee();

    await hashtagProtocol.mint("blockrocket", creator, creator, {from: creator});
    await hashtagProtocol.mint("manchester", creator, alice, {from: alice, value: fee});
    await hashtagProtocol.mint("alice", creator, alice, {from: alice, value: fee});
    await hashtagProtocol.mint("blockchain", creator, bob, {from: creator, value: fee});
    await hashtagProtocol.mint("bob", creator, bob, {from: creator, value: fee});

    console.log('successful!');
};
