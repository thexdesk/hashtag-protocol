import Vue from "vue";
import App from "./App.vue";
import { router } from "./routes";
import store from "./stores/index";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
import "./styles/semantic.min.css";
import VueMoment from "vue-moment";

Vue.use(VueMoment);

const client = new ApolloClient({
  uri: "http://localhost:8000/subgraphs/name/blockrockettech/hashtag",
});

const apolloProvider = new VueApollo({
  defaultClient: client,
});

Vue.use(VueApollo);
Vue.config.productionTip = false;

Vue.filter("to2Dp", function (value) {
  if (!value) return "";
  return parseFloat(value).toFixed(2);
});

Vue.filter("shortEth", function (value) {
  if (!value) return "";
  return (
    value.substr(0, 6) + "..." + value.substr(value.length - 6, value.length)
  );
});

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
