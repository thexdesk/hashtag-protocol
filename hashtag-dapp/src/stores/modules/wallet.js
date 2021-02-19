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
const onboard = Onboard({
  dappId: process.env.VUE_APP_BLOCKNATIVE_API_KEY,
  networkId: 4, // Dapp currently only supports Rinkeby
  subscriptions: {
    wallet: (wallet) => {
      provider = new ethers.providers.Web3Provider(wallet.provider);

      // store the selected wallet name to be retrieved next time the app loads
      localStorage.setItem("selectedWallet", wallet.name);
    },
  },
});

// create options object
const options = {
  dappId: process.env.VUE_APP_BLOCKNATIVE_API_KEY,
  networkId: 4, // Dapp currently only supports Rinkeby
  // Optional. See docs.
  // transactionHandlers: [(event) => console.log(event.transaction)],
};

// initialize and connect to the api
const blocknative = new BlocknativeSdk(options);

const state = {
  web3Objects: {},
  accrued: null,
  fees: {
    protocol: 0,
    tagging: ethers.utils.parseEther("0.01"),
    mintAndTag: ethers.utils.parseEther("0.01"),
  },
  openModalCloseFn: () => {},
};

const getters = {
  homesteadProvider: (state) => state.web3Objects.homesteadProvider,
  account: (state) => {
    return state.web3Objects && state.web3Objects.account
      ? state.web3Objects.account
      : "Connect wallet";
  },
  accrued: (state) => state.accrued,
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

        if (window.ethereum) {
          window.ethereum.on("accountsChanged", () => {
            dispatch("bootstrap");
          });
        }

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
          publisher: process.env.VUE_APP_PUBLISHER_ADDRESS,
          readyToTransact,
        });

        dispatch("getTaggingFee");
        dispatch("getMintAndTagFee");
        dispatch("getAccruedEthFromRegistry");
      }
    }

    // dispatch("cacheNFTAssets");
  },

  captureOpenModalCloseFn({ commit }, openModalCloseFn) {
    commit("setOpenModalCloseFn", openModalCloseFn);
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

    const tx = await hashtagProtocolContract.mint(payload, publisher, account);

    const { emitter } = blocknative.transaction(tx.hash);

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
    if (!state.web3Objects.readyToTransact) {
      await dispatch("bootstrap");
    }

    const { web3Objects, fees } = state;
    const { account, contracts, publisher } = web3Objects;
    const { erc721HashtagRegistryContract } = contracts;
    const { hashtagId, nftContract, nftId } = payload;

    // function tag(uint256 _hashtagId, address _nftContract, uint256 _nftId, address _publisher, address _tagger) payable public {
    const tx = await erc721HashtagRegistryContract.tag(
      hashtagId,
      nftContract,
      nftId,
      publisher,
      account,
      {
        value: ethers.utils.bigNumberify(fees.tagging),
      }
    );

    const { emitter } = blocknative.transaction(tx.hash);

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
    if (!state.web3Objects.readyToTransact) {
      await dispatch("bootstrap");
    }

    const { web3Objects, fees } = state;
    const { account, contracts, publisher } = web3Objects;
    const { erc721HashtagRegistryContract } = contracts;
    const { hashtag, nftContract, nftId } = payload;

    const tx = await erc721HashtagRegistryContract.mintAndTag(
      hashtag.indexOf("#") === 0 ? hashtag : `#${hashtag}`,
      nftContract,
      nftId,
      publisher,
      account,
      {
        value: ethers.utils.bigNumberify(fees.tagging),
      }
    );

    const { emitter } = blocknative.transaction(tx.hash);

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

  async getAccruedEthFromRegistry({ commit }) {
    const { contracts, account } = state.web3Objects;
    const { erc721HashtagRegistryContract } = contracts;
    const accrued = await erc721HashtagRegistryContract.totalDue(account);

    commit("setAccrued", accrued);
  },

  async drawDownFromRegistry({ state, dispatch, commit }) {
    const { contracts, account } = state.web3Objects;
    const { erc721HashtagRegistryContract } = contracts;
    const tx = await erc721HashtagRegistryContract.drawDown(account);

    const { emitter } = blocknative.transaction(tx.hash);

    emitter.on("all", (transaction) => {
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
