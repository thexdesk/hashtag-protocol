import Vue from "vue";
import Vuex from "vuex";
import wallet from "./modules/wallet";
import hashtags from "./modules/hashtags";
import publishers from "./modules/publishers";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    wallet,
    hashtags,
    publishers,
  },
});
