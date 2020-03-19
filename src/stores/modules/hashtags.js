import Vue from 'vue';
import {ethers} from 'ethers';

import HashtagProtocolTruffleConf from '../../truffleconf/HashtagProtocol';
import utils from '../../utils';

const state = {
  hashtags: [
    {
      id: 1,
      hashtag: "jack",
      tagAmounts: 200000,
      earnings: 30
    },
    {
      id: 2,
      hashtag: "gaming",
      tagAmounts: 100000,
      earnings: 20
    }
  ],
  web3Objects: {}
};
const getters = {
  allHashtags: state => state.hashtags
};
const actions = {
  async bootstrap({commit}) {
    await window.ethereum.enable();

    /*global web3*/
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    const signer = provider.getSigner();
    const chain = await provider.getNetwork();

    const hashtagProtocolContractAddress = utils.getContractAddressFromTruffleConf(HashtagProtocolTruffleConf, chain.chainId);
    const hashtagProtocolContract = new ethers.Contract(
        hashtagProtocolContractAddress,
        HashtagProtocolTruffleConf.abi,
        signer,
    );

    commit('setWeb3Objects', {
      provider,
      signer,
      chain,
      contracts: {
        hashtagProtocolContract
      }
    });
  },
  addNewHashtag({commit}, payload) {
    commit("addNewHashtag", payload);
  },
  mint({dispatch}, payload) {
    dispatch('addNewHashtag', payload);
  }
};
const mutations = {
  async addNewHashtag(state, payload) {
    // await state.web3Objects.contracts.hashtagProtocolContract.addPublisher(
    //     '0x12D062B19a2DF1920eb9FC28Bd6E9A7E936de4c2'
    // );

    await state.web3Objects.contracts.hashtagProtocolContract.mint(
        payload.newHashtag.hashtag,
        '0x12D062B19a2DF1920eb9FC28Bd6E9A7E936de4c2'
    );

    state.hashtags.push(payload.newHashtag);
  },
  setWeb3Objects(state, payload) {
    Vue.set(state, 'web3Objects', payload);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
