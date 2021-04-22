import Vue from "vue";
import Vuex from "vuex";
import wallet from "./modules/wallet";
import publishers from "./modules/publishers";
import transactionFees from "./modules/transactionFees";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    wallet,
    publishers,
    transactionFees,
  },
});
