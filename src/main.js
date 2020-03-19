import Vue from "vue";
import App from "./App.vue";
import { router } from "./routes";
import store from "./stores/index";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
import "./styles/semantic.min.css";

const client = new ApolloClient({
  uri: "http://localhost:8000/subgraphs/name/swaylock/hashtag-protocol"
});

const apolloProvider = new VueApollo({
  defaultClient: client
});

Vue.use(VueApollo);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
