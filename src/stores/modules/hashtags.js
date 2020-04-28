import Vue from "vue";
import { ethers } from "ethers";

import HashtagProtocolTruffleConf from "../../truffleconf/HashtagProtocol";
import ERC721HashtagRegistry from "../../truffleconf/ERC721HashtagRegistry";
import utils from "../../utils";

const state = {
  web3Objects: {},
  fees: {
    protocol: ethers.utils.parseEther("0.01"),
    tagging: ethers.utils.parseEther("0.01"),
  },
  supportedNfts: {
    ko: "0x2df6816286c583a7ef8637cd4b7cc1cc62f6161e",
  },
};

const getters = {
  digitalAssets: (state) => state.digitalAssets,
  account: (state) => {
    return state.web3Objects && state.web3Objects.account
      ? state.web3Objects.account
      : "Connect wallet";
  },
};

const actions = {
  async bootstrap({ commit, dispatch }) {
    await window.ethereum.enable();

    /*global web3*/
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    const signer = provider.getSigner();
    const chain = await provider.getNetwork();

    const hashtagProtocolContractAddress = utils.getContractAddressFromTruffleConf(
      HashtagProtocolTruffleConf,
      chain.chainId
    );
    const hashtagProtocolContract = new ethers.Contract(
      hashtagProtocolContractAddress,
      HashtagProtocolTruffleConf.abi,
      signer
    );

    const erc721HashtagRegistryAddress = utils.getContractAddressFromTruffleConf(
      ERC721HashtagRegistry,
      chain.chainId
    );

    const erc721HashtagRegistryContract = new ethers.Contract(
      erc721HashtagRegistryAddress,
      ERC721HashtagRegistry.abi,
      signer
    );

    const accounts = await provider.listAccounts();

    commit("setWeb3Objects", {
      provider,
      signer,
      chain,
      contracts: {
        hashtagProtocolContract,
        erc721HashtagRegistryContract,
      },
      account: accounts[0],
      publisher: "0xD677AEd0965AC9B54e709F01A99cEcA205aebC4B", //FIXME - hardcoded for now for rinkeby testing
    });

    dispatch("getProtocolFee");
    dispatch("getTaggingFee");
  },

  async mint({ state }, payload) {
    console.log(`mint ${payload}`);
    const { contracts, account, publisher } = state.web3Objects;
    const { hashtagProtocolContract } = contracts;

    await hashtagProtocolContract.mint(payload, publisher, account, {
      value: ethers.utils.bigNumberify(state.fees.protocol),
    });
  },

  async tag({ state }, payload) {
    const { web3Objects, fees } = state;
    const { account, contracts } = web3Objects;
    const { erc721HashtagRegistryContract } = contracts;
    const { hashtagId, nftContract, nftId } = payload;

    await erc721HashtagRegistryContract.tag(
      hashtagId,
      nftContract,
      nftId,
      account,
      {
        value: ethers.utils.bigNumberify(fees.protocol),
      }
    );
  },

  async getProtocolFee({ commit }) {
    const { hashtagProtocolContract } = state.web3Objects.contracts;
    const fee = (await hashtagProtocolContract.fee()).toString();

    commit("setProtocolFee", fee);
  },

  async getTaggingFee({ commit }) {
    const { erc721HashtagRegistryContract } = state.web3Objects.contracts;
    const fee = (
      await erc721HashtagRegistryContract.calculateTagFeeAfterDiscount()
    ).toString();

    commit("setTaggingFee", fee);
  },
};

const mutations = {
  async setProtocolFee(state, fee) {
    console.log(`setProtocolFee ${fee}`);
    Vue.set(state, "fees.platform", fee);
  },

  async setTaggingFee(state, fee) {
    console.log(`setTaggingFee ${fee}`);
    Vue.set(state, "fees.tagging", fee);
  },

  setWeb3Objects(state, payload) {
    Vue.set(state, "web3Objects", payload);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
