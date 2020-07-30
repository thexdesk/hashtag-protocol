import Vue from "vue";
import { ethers } from "ethers";
import Onboard from "bnc-onboard";

let provider;

const onboard = Onboard({
  dappId: "773ba398-31f9-4816-a3b3-960a075a0f31", // Hashtag API key
  networkId: 4, // Dapp currently only supports Rinkeby
  subscriptions: {
    wallet: (wallet) => {
      provider = new ethers.providers.Web3Provider(wallet.provider);

      // store the selected wallet name to be retrieved next time the app loads
      localStorage.setItem("selectedWallet", wallet.name);
    },
  },
});

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
    mintAndTag: ethers.utils.parseEther("0.02"),
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
  homesteadProvider: (state) => state.web3Objects.homesteadProvider,
  account: (state) => {
    return state.web3Objects && state.web3Objects.account
      ? state.web3Objects.account
      : "Connect wallet";
  },
};

const actions = {
  async bootstrap({ commit, dispatch }) {
    // check if a wallet was previously selected and use that
    const previouslySelectedWallet = localStorage.getItem("selectedWallet");

    let userSelectedAWallet;
    if (
      previouslySelectedWallet != null &&
      previouslySelectedWallet !== "null"
    ) {
      userSelectedAWallet = await onboard.walletSelect(
        previouslySelectedWallet
      );
    } else {
      userSelectedAWallet = await onboard.walletSelect();
    }

    // True if either a wallet was previously selected or was now selected from the modal
    // Will be false if the user closes the modal before selecting a wallet
    if (userSelectedAWallet) {
      // Check wallet is ready to transact
      const readyToTransact = await onboard.walletCheck();

      if (readyToTransact) {
        const onboardState = onboard.getState();

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

        commit("setWeb3Objects", {
          provider,
          homesteadProvider: ethers.getDefaultProvider("homestead"),
          signer,
          chain,
          contracts: {
            hashtagProtocolContract,
            erc721HashtagRegistryContract,
          },
          account: onboardState.address,
          publisher: "0xd677aed0965ac9b54e709f01a99ceca205aebc4b", //FIXME - hardcoded for now for rinkeby testing
          readyToTransact,
        });

        dispatch("getProtocolFee");
        dispatch("getTaggingFee");
        dispatch("getMintAndTagFee");
      }
    }

    // dispatch("cacheNFTAssets");
  },

  async changeWallet() {
    await onboard.walletSelect();
  },

  async mint({ state, dispatch }, payload) {
    if (!state.web3Objects.readyToTransact) {
      await dispatch("bootstrap");
    }

    const { contracts, account, publisher } = state.web3Objects;
    const { hashtagProtocolContract } = contracts;

    // function mint(string memory _hashtag, address payable _publisher, address _recipient) payable public returns (uint256 _tokenId) {
    await hashtagProtocolContract.mint(payload, publisher, account, {
      value: ethers.utils.bigNumberify(state.fees.protocol),
    });
  },

  async tag({ state, dispatch }, payload) {
    if (!state.web3Objects.readyToTransact) {
      await dispatch("bootstrap");
    }

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

  async mintAndTag({ state, dispatch }, payload) {
    if (!state.web3Objects.readyToTransact) {
      await dispatch("bootstrap");
    }

    const { web3Objects, fees } = state;
    const { account, contracts, publisher } = web3Objects;
    const { erc721HashtagRegistryContract } = contracts;
    const { hashtag, nft } = payload;

    console.log(hashtag);

    await erc721HashtagRegistryContract.mintAndTag(
      hashtag[0],
      nft.asset_contract.address,
      nft.token_id,
      publisher,
      account,
      {
        value: ethers.utils.bigNumberify(fees.mintAndTag),
        gasLimit: 5000000,
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

  async getMintAndTagFee({ commit }) {
    const { erc721HashtagRegistryContract } = state.web3Objects.contracts;
    const fee = (
      await erc721HashtagRegistryContract.calculateMintAndTagFee()
    ).toString();

    commit("setMintAndTagFee", fee);
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

  async setMintAndTagFee(state, fee) {
    Vue.set(state, "fees.mintAndTag", fee);
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
