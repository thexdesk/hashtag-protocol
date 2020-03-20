import Vue from 'vue';
import {ethers} from 'ethers';

import HashtagProtocolTruffleConf from '../../truffleconf/HashtagProtocol';
import utils from '../../utils';

const state = {
  hashtags: [],
  web3Objects: {},
  publisher: '0x401cBf2194D35D078c0BcdAe4BeA42275483ab5F',
  fee: ethers.utils.parseEther('0.01'), // FIXME look up from contract
  account: null,
};

const getters = {
  allHashtags: state => state.hashtags,
  account: state => state.account,
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

    const accounts = await provider.listAccounts();

    commit('setWeb3Objects', {
      provider,
      signer,
      chain,
      contracts: {
        hashtagProtocolContract
      },
      account: accounts[0],
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
    await state.web3Objects.contracts.hashtagProtocolContract.mint(
        payload.newHashtag.hashtag,
        state.publisher,
        {gasLimit: 500000, value: state.fee}, // rinkeby testing
    );

    state.hashtags.push(payload.newHashtag);
  },

  setWeb3Objects(state, payload) {
    Vue.set(state, 'web3Objects', payload);
    state.account = payload.account;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
