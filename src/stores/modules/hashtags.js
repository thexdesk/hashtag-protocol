import Vue from 'vue';
import {ethers} from 'ethers';

import HashtagProtocolTruffleConf from '../../truffleconf/HashtagProtocol';
import utils from '../../utils';

const state = {
  digitalAssets: [
    {
      name: "d a z e d",
      description: "file under: current mood",
      image: "https://ipfs.infura.io/ipfs/QmQvSQJUEJ1wjN8Gm5kfp47YmDhMGbtp2bkfMynBZuqDdt/asset.jpeg"
    },
    {
      name: "Las Parabolas, Elon Musk [Ethereum Version] - EM1ETH01",
      description: "The product of years of gaining knowledge and skills, and culmination of perfecting them, has resulted in this series, Republica De Las Parabolas - a commemoration of the crypto markets, its aspirations, hopes and dreams. This is the THIRD of SIX unique designs, featuring a portrait of Elon Musk. Musk represents bombastic entrepreneurship and aspiration, at the forefront of technology and exploration. He is also figure of parabolic speculation, given the rise of the Tesla stock price. The design features authentic and original banknote design - the centrepiece is the engraved portrait, made of hundreds of lines and dashes, each placed by hand. The design is filled with minute details and patterns, all reinforcing the central concept. As with all my works, the design is signed, and individually serial numbered - this is the ETHEREUM version of the original Bitcoin version. It one of just THREE uniquely serial numbered animations.",
      image: "https://ipfs.infura.io/ipfs/QmPQxVvRJNcXBTXoDCTnmc5nbQTRBpc2yFQWKqwcZd1YPV/asset.gif"
    },
  ],
  web3Objects: {},
  publisher: '0x401cBf2194D35D078c0BcdAe4BeA42275483ab5F',
  fee: ethers.utils.parseEther('0.01'), // FIXME look up from contract
  account: null,
};

const getters = {
  digitalAssets: state => state.digitalAssets,
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
