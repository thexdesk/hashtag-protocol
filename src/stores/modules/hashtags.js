import Vue from "vue";
import { ethers } from "ethers";

import HashtagProtocolTruffleConf from "../../truffleconf/HashtagProtocol";
import NFTTagger from "../../truffleconf/NFTTagger";
import utils from "../../utils";

const state = {
  web3Objects: {},
  fees: {
    protocol: ethers.utils.parseEther("0.01"),
    tagging: ethers.utils.parseEther("0.01"),
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

    const nftTaggerContractAddress = utils.getContractAddressFromTruffleConf(
      NFTTagger,
      chain.chainId
    );
    const nftTaggerContract = new ethers.Contract(
      nftTaggerContractAddress,
      NFTTagger.abi,
      signer
    );

    const accounts = await provider.listAccounts();

    commit("setWeb3Objects", {
      provider,
      signer,
      chain,
      contracts: {
        hashtagProtocolContract,
        nftTaggerContract,
      },
      account: accounts[0],
      publisher: "0xD677AEd0965AC9B54e709F01A99cEcA205aebC4B", //FIXME - hardcoded for now for rinkeby testing
    });

    dispatch("getProtocolFee");
    dispatch("getTaggingFee");
  },

  addNewHashtag({ commit }, payload) {
    commit("addNewHashtag", payload);
  },

  mint({ dispatch }, payload) {
    dispatch("addNewHashtag", payload);
  },

  tag({ commit }, payload) {
    commit("tagAsset", payload);
  },

  getProtocolFee({ commit }, payload) {
    commit("getProtocolFee", payload);
  },

  getTaggingFee({ commit }, payload) {
    commit("getTaggingFee", payload);
  },
};

const mutations = {
  async addNewHashtag(state, payload) {
    const { contracts, account, publisher } = state.web3Objects;
    const { hashtagProtocolContract } = contracts;

    await hashtagProtocolContract.mint(payload, publisher, account, {
      value: ethers.utils.bigNumberify(state.fees.protocol),
    });
  },

  async tagAsset(state, payload) {
    const { web3Objects, fees } = state;
    const { account, contracts } = web3Objects;
    const { nftTaggerContract } = contracts;
    const { hashtagId, nftContract, nftId } = payload;

    await nftTaggerContract.tag(hashtagId, nftContract, nftId, account, {
      value: ethers.utils.bigNumberify(fees.protocol),
    });
  },

  async getProtocolFee(state) {
    const { hashtagProtocolContract } = state.web3Objects.contracts;
    const fee = (await hashtagProtocolContract.fee()).toString();
    Vue.set(state, "fees.platform", fee);
  },

  async getTaggingFee(state) {
    const { nftTaggerContract } = state.web3Objects.contracts;
    const fee = (
      await nftTaggerContract.calculateTagFeeAfterDiscount()
    ).toString();
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
