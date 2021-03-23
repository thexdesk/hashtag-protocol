import Vue from "vue";
import App from "./App.vue";
import AppConfig from "@/appconfig";
import { router } from "./routes";
import store from "./stores/index";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
import VueMoment from "vue-moment";
import Buefy from "buefy";
import VueScreen from "vue-screen";
import { ethers } from "ethers";
import axios from "axios";
import VueAxios from "vue-axios";
import "@/mixins/global";

Vue.use(AppConfig);
Vue.use(Buefy);
Vue.use(VueMoment);
Vue.use(VueAxios, axios);
Vue.use(VueScreen, "bulma");

// Connections for GraphQL. See config.js
const hashtagClient = new ApolloClient({
  uri: AppConfig.hashtagSubgraph,
});

const nftsClient = new ApolloClient({
  uri: AppConfig.nftSearchSubgraph,
});

const apolloProvider = new VueApollo({
  clients: {
    hashtagClient,
    nftsClient,
  },

  defaultClient: hashtagClient,
});

Vue.use(VueApollo);
Vue.config.productionTip = false;

Vue.filter("toDp", function (value) {
  if (!value) return value;
  return parseFloat(value).toFixed(4);
});

Vue.filter("shortEth", function (value) {
  if (!value) return value;

  return `
  ${value.substr(0, 6)}...${value.substr(value.length - 4, value.length)}
  `;
});

Vue.filter("toEth", function (value, decimals = null) {
  if (!value) return value;
  if (decimals) {
    let ether = Number(
      ethers.utils.formatEther(ethers.utils.bigNumberify(value))
    );
    return ether.toFixed(decimals);
  }
  return ethers.utils.formatEther(ethers.utils.bigNumberify(value));
});

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
