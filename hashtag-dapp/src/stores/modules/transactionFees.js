import EthGasFeeService from "@/services/EthGasFeeService";
import ExchangeRateService from "@/services/ExchangeRateService";
import { format } from "timeago.js";

const state = {
  gasFastest: null,
  gasFast: null,
  gasMedium: null,
  gasSlow: null,
  gasUpdated: null,
  ethUsdExchange: null,
  exchangeRateUpdated: null,
  mintingFeeETH: {},
  taggingFeeETH: null,
  mintAndTagFeeETH: null,
  mintingFeeUSD: {},
  taggingFeeUSD: null,
  mintAndTagFeeUSD: null,
};

const getters = {
  gasFastest: (state) => state.gasFastest,
  gasFast: (state) => state.gasFast,
  gasMedium: (state) => state.gasMedium,
  gasSlow: (state) => state.gasSlow,
  gasUpdated: (state) => state.gasUpdated,
  ethUsdExchange: (state) => state.ethUsdExchange,
  exchangeRateUpdated: (state) => state.exchangeRateUpdated,
  mintingFeeETH: (state) => state.mintingFeeETH,
  taggingFeeETH: (state) => state.taggingFeeETH,
  mintAndTagFeeETH: (state) => state.mintAndTagFeeETH,
  mintingFeeUSD: (state) => state.mintingFeeUSD,
  taggingFeeUSD: (state) => state.taggingFeeUSD,
  mintAndTagFeeUSD: (state) => state.mintAndTagFeeUSD,
};

const actions = {
  async updateFees({ commit, dispatch }) {
    this.ethGasFeeService = new EthGasFeeService();
    this.ethGasFees = await this.ethGasFeeService
      .fetchGasFees()
      .catch((e) => console.log(e));

    if (this.ethGasFees.success) {
      commit("setGasFastest", this.ethGasFees.estimates.fastest);
      commit("setGasFast", this.ethGasFees.estimates.fast);
      commit("setGasMedium", this.ethGasFees.estimates.medium);
      commit("setGasSlow", this.ethGasFees.estimates.slow);
      commit("setGasUpdated", format(new Date(this.ethGasFees.updated)));
    } else {
      // @todo set values to null so as not to have stale prices?
      // or show last updated prices in UI otherwise null.
    }

    this.exchangeRateService = new ExchangeRateService();
    this.ethUsdExchangeRate = await this.exchangeRateService
      .fetchEthUsd()
      .catch((e) => console.log(e));

    if (this.ethUsdExchangeRate.data.rateUsd) {
      commit("setEthUsdExchange", this.ethUsdExchangeRate.data.rateUsd);

      // Format formats date as "time ago".
      // see https://github.com/hustcc/timeago.js
      commit(
        "setExchangeRateUpdated",
        format(this.ethUsdExchangeRate.timestamp)
      );
    }

    if (this.ethGasFees.success && this.ethUsdExchangeRate.data.rateUsd) {
      dispatch("updateTransactionFees");
    }
    return true;
  },

  async updateTransactionFees({ state, commit }) {
    const ethUsdRate = state.ethUsdExchange / 1000000000;
    const gasLimitMint = 145000;
    let fastest, fast, average, slow;
    //let mintingFeeUSD, mintingFeeETH;
    //const gasLimitTagging = 150000;
    //const gasLimitMintAndTag = 190000;

    fastest = (state.gasFastest * gasLimitMint * 0.000000001).toFixed(4);
    fast = (state.gasFast * gasLimitMint * 0.000000001).toFixed(4);
    average = (state.gasMedium * gasLimitMint * 0.000000001).toFixed(4);
    slow = (state.gasSlow * gasLimitMint * 0.000000001).toFixed(4);

    commit("setMintingFeeETH", {
      fastest: fastest,
      fast: fast,
      average: average,
      slow: slow,
    });

    fastest = (state.gasFastest * gasLimitMint * ethUsdRate).toFixed(2);
    fast = (state.gasFast * gasLimitMint * ethUsdRate).toFixed(2);
    average = (state.gasMedium * gasLimitMint * ethUsdRate).toFixed(2);
    slow = (state.gasSlow * gasLimitMint * ethUsdRate).toFixed(2);

    commit("setMintingFeeUSD", {
      fastest: fastest,
      fast: fast,
      average: average,
      slow: slow,
    });
  },
};

const mutations = {
  setGasFastest(state, payload) {
    state.gasFastest = payload;
  },
  setGasFast(state, payload) {
    state.gasFast = payload;
  },
  setGasMedium(state, payload) {
    state.gasMedium = payload;
  },
  setGasSlow(state, payload) {
    state.gasSlow = payload;
  },
  setGasUpdated(state, payload) {
    state.gasUpdated = payload;
  },
  setEthUsdExchange(state, payload) {
    state.ethUsdExchange = payload;
  },
  setExchangeRateUpdated(state, payload) {
    state.exchangeRateUpdated = payload;
  },
  setMintingFeeETH(state, payload) {
    state.mintingFeeETH = payload;
  },
  setMintingFeeUSD(state, payload) {
    state.mintingFeeUSD = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
