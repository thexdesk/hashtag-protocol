import Vue from "vue";
import Vuex from "vuex";
import hashtags from "./modules/hashtags";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    hashtags,
  },
});
