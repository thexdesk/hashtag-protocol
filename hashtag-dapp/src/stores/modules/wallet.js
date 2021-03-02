import Vue from "vue";
import { ethers } from "ethers";
import Onboard from "bnc-onboard";
import BlocknativeSdk from "bnc-sdk";
import { ToastProgrammatic as Toast } from "buefy";
import HashtagProtocolTruffleConf from "../../truffleconf/HashtagProtocol";
import ERC721HashtagRegistry from "../../truffleconf/ERC721HashtagRegistry";
import utils from "../../utils";

const eventMap = {
  txSent: {
    msg: "Transaction has been sent to the network",
    type: "is-dark",
  },
  txPool: {
    msg: "Transaction is in the mempool and is pending",
    type: "is-dark",
  },
  txConfirmed: {
    msg: "Transaction has been mined",
    type: "is-success",
  },
  txFailed: {
    msg: "Transaction has failed",
    type: "is-danger",
  },
  txSpeedUp: {
    msg: "Transaction been speeded up",
    type: "is-dark",
  },
  txCancel: {
    msg: "Transaction been cancelled",
    type: "is-warning",
  },
  txDropped: {
    msg: "Transaction been dropped",
    type: "is-warning",
  },
};

let provider;

const state = {
  address: null,
  network: null,
  balance: null,

  onboard: {},
  blocknative: {},
  wallet: {},
  web3Objects: {},
  signer: {},

  fees: {
    protocol: 0,
    tagging: ethers.utils.parseEther("0.01"),
    mintAndTag: ethers.utils.parseEther("0.01"),
  },
  accrued: null,

  openModalCloseFn: () => {},
};

const getters = {
  homesteadProvider: (state) => state.web3Objects.homesteadProvider,
  accrued: (state) => state.accrued,
  address: (state) => state.address,
  network: (state) => state.network,
  balance: (state) => state.balance,
  onboard: (state) => state.onboard,
  wallet: (state) => state.wallet,
  signer: (state) => state.signer,
  blocknative: (state) => state.blocknative,
};

const actions = {
  async initOnboard({ commit }) {
    const onboard = Onboard({
      dappId: process.env.VUE_APP_BLOCKNATIVE_API_KEY,
      networkId: Number(process.env.VUE_APP_ONBOARD_NETWORK_ID),
      subscriptions: {
        address: (address) => {
          commit("setWalletAddress", address);
        },
        network: (network) => {
          commit("setWalletNetwork", network);
        },
        balance: (balance) => {
          commit("setWalletBalance", balance);
        },
        wallet: (wallet) => {
          if (wallet.provider) {
            commit("setWallet", wallet);

            const ethersProvider = new ethers.providers.Web3Provider(
              wallet.provider
            );

            provider = ethersProvider;

            const signer = provider.getSigner();

            console.log(signer);
            commit("setSigner", signer);

            // store the selected wallet name to be retrieved next time the app loads
            localStorage.setItem("selectedWallet", wallet.name);
          } else {
            provider = null;
            commit("setSigner", {});
            commit("setWallet", {});
          }
        },
      },
    });

    commit("setOnBoard", onboard);

    //dispatch("reconnectWallet");
    //dispatch("getTaggingFee");
    //dispatch("getMintAndTagFee");
    //dispatch("getAccruedEthFromRegistry");
  },

  async reconnectWallet() {
    const previouslySelectedWallet = window.localStorage.getItem(
      "selectedWallet"
    );

    if (previouslySelectedWallet && this.onboard) {
      this.onboard.walletSelect(previouslySelectedWallet);
    }
  },

  async initBlocknative({ commit }) {
    const options = {
      dappId: process.env.VUE_APP_BLOCKNATIVE_API_KEY,
      networkId: Number(process.env.VUE_APP_ONBOARD_NETWORK_ID),
    };

    const blocknative = new BlocknativeSdk(options);
    commit("setBlocknative", blocknative);
  },

  async initProtocol({ state, commit, dispatch }) {
    //const readyToTransact = await dispatch("connectWallet");

    const readyToTransact = true;
    if (readyToTransact) {
      console.log("initProtocol called");
      console.log(state.address);
      //console.log(state.provider);
      // const signer = state.signer;
      const chain = state.network;

      const hashtagProtocolContractAddress = utils.getContractAddressFromTruffleConf(
        HashtagProtocolTruffleConf,
        chain
      );
      const hashtagProtocolContract = new ethers.Contract(
        hashtagProtocolContractAddress,
        HashtagProtocolTruffleConf.abi,
        state.signer
      );

      const erc721HashtagRegistryAddress = utils.getContractAddressFromTruffleConf(
        ERC721HashtagRegistry,
        chain
      );

      const erc721HashtagRegistryContract = new ethers.Contract(
        erc721HashtagRegistryAddress,
        ERC721HashtagRegistry.abi,
        state.signer
      );

      commit("setWeb3Objects", {
        provider,
        homesteadProvider: ethers.getDefaultProvider("homestead"),
        signer: state.signer,
        contracts: {
          hashtagProtocolContract,
          erc721HashtagRegistryContract,
        },
        publisher: process.env.VUE_APP_PUBLISHER_ADDRESS,
      });

      dispatch("getTaggingFee");
      dispatch("getMintAndTagFee");
      dispatch("getAccruedEthFromRegistry");
    }
  },

  async readyToTransact({ state }) {
    if (!provider) {
      const walletSelected = await state.onboard.walletSelect();
      if (!walletSelected) {
        return false;
      }
    }

    const ready = await state.onboard.walletCheck();
    return ready;
  },

  bootstrap({ dispatch }) {
    dispatch("initOnboard");
    dispatch("initBlocknative");
    dispatch("initProtocol");
    dispatch("connectWallet");
  },

  async connectWallet({ state }) {
    if (!provider) {
      const walletSelected = await state.onboard.walletSelect();
      if (!walletSelected) {
        return false;
      }
    }

    const ready = await state.onboard.walletCheck();
    return ready;
  },

  captureOpenModalCloseFn({ commit }, openModalCloseFn) {
    commit("setOpenModalCloseFn", openModalCloseFn);
  },

  async mint({ state, dispatch }, payload) {
    if (!dispatch("readyToTransact")) {
      await dispatch("bootstrap");
    }

    const { contracts, publisher } = state.web3Objects;
    const { hashtagProtocolContract } = contracts;

    const tx = await hashtagProtocolContract.mint(
      payload,
      publisher,
      state.address
    );

    const { emitter } = state.blocknative.transaction(tx.hash);

    emitter.on("all", (transaction) => {
      Toast.open({
        duration: 5000,
        message: eventMap[transaction.eventCode].msg,
        position: "is-bottom",
        type: eventMap[transaction.eventCode].type,
      });
    });
  },

  async tag({ state, dispatch }, payload) {
    if (!dispatch("readyToTransact")) {
      await dispatch("bootstrap");
    }

    const { web3Objects, fees } = state;
    const { contracts, publisher } = web3Objects;
    const { erc721HashtagRegistryContract } = contracts;
    const { hashtagId, nftContract, nftId } = payload;

    // function tag(uint256 _hashtagId, address _nftContract, uint256 _nftId, address _publisher, address _tagger) payable public {
    const tx = await erc721HashtagRegistryContract.tag(
      hashtagId,
      nftContract,
      nftId,
      publisher,
      state.address,
      {
        value: ethers.utils.bigNumberify(fees.tagging),
      }
    );

    const { emitter } = state.blocknative.transaction(tx.hash);

    emitter.on("all", (transaction) => {
      Toast.open({
        duration: 5000,
        message: eventMap[transaction.eventCode].msg,
        position: "is-bottom",
        type: eventMap[transaction.eventCode].type,
      });
    });
  },

  async mintAndTag({ state, dispatch }, payload) {
    if (!dispatch("readyToTransact")) {
      await dispatch("bootstrap");
    }

    const { web3Objects, fees } = state;
    const { contracts, publisher } = web3Objects;
    const { erc721HashtagRegistryContract } = contracts;
    const { hashtag, nftContract, nftId } = payload;

    const tx = await erc721HashtagRegistryContract.mintAndTag(
      hashtag.indexOf("#") === 0 ? hashtag : `#${hashtag}`,
      nftContract,
      nftId,
      publisher,
      state.address,
      {
        value: ethers.utils.bigNumberify(fees.tagging),
      }
    );

    const { emitter } = state.blocknative.transaction(tx.hash);

    emitter.on("all", (transaction) => {
      Toast.open({
        duration: 5000,
        message: eventMap[transaction.eventCode].msg,
        position: "is-bottom",
        type: eventMap[transaction.eventCode].type,
      });
    });
  },

  async getProtocolFee({ commit }) {
    commit("setProtocolFee", "0");
  },

  async getTaggingFee({ commit }) {
    const { erc721HashtagRegistryContract } = state.web3Objects.contracts;
    const fee = (await erc721HashtagRegistryContract.tagFee()).toString();

    commit("setTaggingFee", fee);
  },

  async getAccruedEthFromRegistry({ state, commit }) {
    const { contracts } = state.web3Objects;
    const { erc721HashtagRegistryContract } = contracts;
    console.log(state.address);
    const accrued = await erc721HashtagRegistryContract.totalDue(state.address);

    commit("setAccrued", accrued);
  },

  async drawDownFromRegistry({ state, dispatch, commit }) {
    const { contracts } = state.web3Objects;
    const { erc721HashtagRegistryContract } = contracts;
    const tx = await erc721HashtagRegistryContract.drawDown(state.address);

    const { emitter } = state.blocknative.transaction(tx.hash);

    emitter.on("all", function (transaction) {
      Toast.open({
        duration: 5000,
        message: eventMap[transaction.eventCode].msg,
        position: "is-bottom",
        type: eventMap[transaction.eventCode].type,
      });

      if (transaction.eventCode === "txConfirmed") {
        state.openModalCloseFn();
        dispatch("getAccruedEthFromRegistry");
        commit("setOpenModalCloseFn", () => {});
      }
    });
  },

  async getMintAndTagFee({ commit }) {
    const { erc721HashtagRegistryContract } = state.web3Objects.contracts;
    const fee = (await erc721HashtagRegistryContract.tagFee()).toString();

    commit("setMintAndTagFee", fee);
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

  setAccrued(state, accrued) {
    Vue.set(state, "accrued", accrued);
  },

  setOpenModalCloseFn(state, openModalCloseFn) {
    Vue.set(state, "openModalCloseFn", openModalCloseFn);
  },

  setWalletAddress(state, address) {
    Vue.set(state, "address", address);
  },

  setWalletNetwork(state, network) {
    Vue.set(state, "network", network);
  },

  setWalletBalance(state, balance) {
    Vue.set(state, "balance", balance);
  },

  setWallet(state, wallet) {
    Vue.set(state, "wallet", wallet);
  },

  setOnBoard(state, onboard) {
    Vue.set(state, "onboard", onboard);
  },

  setProvider(state, provider) {
    Vue.set(state, "provider", provider);
  },

  setSigner(state, signer) {
    Vue.set(state, "signer", signer);
  },

  setBlocknative(state, blocknative) {
    Vue.set(state, "onboard", blocknative);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
