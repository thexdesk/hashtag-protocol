import Vue from "vue";
import { ethers } from "ethers";

import HashtagProtocolTruffleConf from "../../truffleconf/HashtagProtocol";
import NFTTagger from "../../truffleconf/NFTTagger";
import utils from "../../utils";

const state = {
  digitalAssets: [
    {
      name: "d a z e d",
      description: "file under: current mood",
      image:
        "https://ipfs.infura.io/ipfs/QmQvSQJUEJ1wjN8Gm5kfp47YmDhMGbtp2bkfMynBZuqDdt/asset.jpeg",
    },
    {
      name: "Las Parabolas, Elon Musk [Ethereum Version] - EM1ETH01",
      description:
        "The product of years of gaining knowledge and skills, and culmination of perfecting them, has resulted in this series, Republica De Las Parabolas - a commemoration of the crypto markets, its aspirations, hopes and dreams. This is the THIRD of SIX unique designs, featuring a portrait of Elon Musk. Musk represents bombastic entrepreneurship and aspiration, at the forefront of technology and exploration. He is also figure of parabolic speculation, given the rise of the Tesla stock price. The design features authentic and original banknote design - the centrepiece is the engraved portrait, made of hundreds of lines and dashes, each placed by hand. The design is filled with minute details and patterns, all reinforcing the central concept. As with all my works, the design is signed, and individually serial numbered - this is the ETHEREUM version of the original Bitcoin version. It one of just THREE uniquely serial numbered animations.",
      image:
        "https://ipfs.infura.io/ipfs/QmPQxVvRJNcXBTXoDCTnmc5nbQTRBpc2yFQWKqwcZd1YPV/asset.gif",
    },
  ],
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
      : null;
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
      publisher: accounts[0], // This is now based on account #1 being a publisher. Will need changing for prod
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

  tag({ dispatch }, payload) {
    dispatch("tagAsset", payload);
  },

  getProtocolFee({ commit }, payload) {
    commit("getProtocolFee", payload);
  },

  getTaggingFee({ commit }, payload) {
    commit("getTaggingFee", payload);
  },
};

const mutations = {
  async addNewHashtag(state) {
    const { contracts, account } = state.web3Objects;
    const { nftTaggerContract } = contracts;

    // await hashtagProtocolContract.mint(
    //   payload.newHashtag.hashtag,
    //   publisher,
    //   account,
    //   { value: ethers.utils.bigNumberify(state.fees.protocol) }
    // );

    await nftTaggerContract.tag(
      1,
      "0xDdAC0CE12e2057F50EbCB70A19fC0500aFfa20e1",
      1,
      account,
      { value: ethers.utils.bigNumberify(state.fees.protocol) }
    );
  },

  async tagAsset(state, payload) {
    const { nftTaggerContract } = state.web3Objects.contracts;
    const { hashtagId, nftContract, nftId } = payload;
    await nftTaggerContract.tag(hashtagId, nftContract, nftId, state.account);
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
