import Vue from "vue";
import App from "./App.vue";
import { router } from "./routes";
import store from "./stores/index";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
import VueMoment from "vue-moment";
import Buefy from "buefy";
import { ethers } from "ethers";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Buefy);
Vue.use(VueMoment);
Vue.use(VueAxios, axios);

// Connection for GraphQL.
const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/blockrockettech/hashtag",
});

const apolloProvider = new VueApollo({
  defaultClient: client,
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
