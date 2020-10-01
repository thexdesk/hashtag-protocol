import Vue from "vue";
import App from "./App.vue";
import { router } from "./routes";
import ApolloClient from "apollo-boost";
import axios from "axios";
import VueAxios from "vue-axios";
import AxiosPlugin from "vue-axios-cors";
import VueApollo from "vue-apollo";
import VueMoment from "vue-moment";
import VueScreen from "vue-screen";
import Buefy from "buefy";
import "./vee-validate";
import "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-solidity.min.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.min.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import Prism from "vue-prismjs";
import "@/mixins/global";

Vue.use(Buefy);
Vue.use(VueMoment);
Vue.use(VueScreen, "bulma");

Vue.use(VueAxios, axios);
Vue.use(AxiosPlugin);

Vue.component("prism", Prism);

// Connection for GraphQL.
const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/blockrockettech/hashtag",
});

const apolloProvider = new VueApollo({
  defaultClient: client,
});

Vue.use(VueApollo);
Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
