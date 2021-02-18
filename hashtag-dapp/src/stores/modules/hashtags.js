import Vue from "vue";
import nftCache from "../../data/nfts";

// @TODO: Gonna keep this here for now till we figure out a more scalable solution.
const KO_RINKEBY_ADDRESS = "0x2df6816286c583a7ef8637cd4b7cc1cc62f6161e";

const state = {
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
};

const actions = {
  async cacheNFTAssets({ commit }) {
    // just cache KO assets for now...
    const res = await Vue.axios.get(
      `https://rinkeby-api.opensea.io/api/v1/assets?asset_contract_addresses=${KO_RINKEBY_ADDRESS}&order_direction=asc&offset=0&limit=50`
    );

    commit("setNFTAssets", res.data);
  },
};

const mutations = {
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
