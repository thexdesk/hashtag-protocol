import Vue from "vue";
import Vuex from "vuex";
import hashtags from "./modules/hashtags";
import publishers from "./modules/publishers";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    hashtags,
    publishers,
  },
});
