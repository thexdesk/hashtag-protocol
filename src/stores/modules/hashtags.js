import Vue from "vue";
import { ethers } from "ethers";

import HashtagProtocolTruffleConf from "../../truffleconf/HashtagProtocol";
import ERC721HashtagRegistry from "../../truffleconf/ERC721HashtagRegistry";
import utils from "../../utils";

const KO_RINKEBY_ADDRESS = "0x2df6816286c583a7ef8637cd4b7cc1cc62f6161e";

import nftCache from "../../data/nfts";

const state = {
  web3Objects: {},
  fees: {
    protocol: ethers.utils.parseEther("0.01"),
    tagging: ethers.utils.parseEther("0.01"),
  },
  supportedNfts: [
    {
      name: "KnownOriginDigitalAsset",
      contractAddress: KO_RINKEBY_ADDRESS,
    },
  ],
  nftAssetCache: nftCache,
};

const getters = {
  supportedNfts: (state) => state.supportedNfts,
  nftAssetCache: (state) => state.nftAssetCache,
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
      publisher: "0xd677aed0965ac9b54e709f01a99ceca205aebc4b", //FIXME - hardcoded for now for rinkeby testing
    });

    dispatch("getProtocolFee");
    dispatch("getTaggingFee");

    // dispatch("cacheNFTAssets");
  },

  async mint({ state }, payload) {
    const { contracts, account, publisher } = state.web3Objects;
    const { hashtagProtocolContract } = contracts;

    // function mint(string memory _hashtag, address payable _publisher, address _recipient) payable public returns (uint256 _tokenId) {
    await hashtagProtocolContract.mint(payload, publisher, account, {
      value: ethers.utils.bigNumberify(state.fees.protocol),
    });
  },

  async tag({ state }, payload) {
    const { web3Objects, fees } = state;
    const { account, contracts, publisher } = web3Objects;
    const { erc721HashtagRegistryContract } = contracts;
    const { hashtag, nft } = payload;

    // function tag(uint256 _hashtagId, address _nftContract, uint256 _nftId, address _publisher, address _tagger) payable public {
    await erc721HashtagRegistryContract.tag(
      hashtag[0].id,
      nft.asset_contract.address,
      nft.token_id,
      publisher,
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

  async cacheNFTAssets({ commit }) {
    // just cache KO assets for now...
    const res = await Vue.axios.get(
      `https://rinkeby-api.opensea.io/api/v1/assets?asset_contract_addresses=${KO_RINKEBY_ADDRESS}&order_direction=asc&offset=0&limit=50`
    );

    commit("setNFTAssets", res.data);
  },
};

const mutations = {
  async setProtocolFee(state, fee) {
    Vue.set(state, "fees.platform", fee);
  },

  async setTaggingFee(state, fee) {
    Vue.set(state, "fees.tagging", fee);
  },

  setWeb3Objects(state, payload) {
    Vue.set(state, "web3Objects", payload);
  },

  setNFTAssets(state, payload) {
    Vue.set(state, "nftAssetCache", payload);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
