import Vue from "vue";
import App from "./App.vue";
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

Vue.use(Buefy);
Vue.use(VueMoment);
Vue.use(VueAxios, axios);
Vue.use(VueScreen, "bulma");

// Connections for GraphQL.
let hashtagClientURI = process.env.VUE_APP_HASHTAG_SUBGRAPH_URL;
let nftsClientURI = process.env.VUE_APP_TOP_NFTS_SUBGRAPH_URL;

const config = require("platformsh-config").config();

// Set GraphQL connections when app runs on Platform.sh.
// See https://github.com/platformsh/config-reader-nodejs
if (config.isValidPlatform()) {
  // We are on Platform.sh.
  hashtagClientURI = config.VUE_APP_HASHTAG_SUBGRAPH_URL;
  nftsClientURI = config.VUE_APP_TOP_NFTS_SUBGRAPH_URL;
  console.log("on platform");
  console.log(nftsClientURI);
}

const hashtagClient = new ApolloClient({
  uri: hashtagClientURI,
});

const nftsClient = new ApolloClient({
  uri: nftsClientURI,
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
  ${value.substr(0, 4)}...${value.substr(value.length - 4, value.length)}
  `;
});

Vue.filter("toEth", function (value) {
  if (!value) return value;
  return ethers.utils.formatEther(ethers.utils.bigNumberify(value));
});

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
