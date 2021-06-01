import Vue from "vue";
import VueGtm from "vue-gtm";
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
  uri: "https://api.thegraph.com/subgraphs/name/hashtag-protocol/hashtag-mainnet",
});

const apolloProvider = new VueApollo({
  defaultClient: client,
});

Vue.use(VueApollo);
Vue.config.productionTip = false;

Vue.use(VueGtm, {
  id: "GTM-MRK383F", // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryPararms: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}]
  defer: false, // defaults to false. Script can be set to `defer` to increase page-load-time at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible)
  enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: true, // Whether or not display console logs debugs (optional)
  loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
  vueRouter: router, // Pass the router instance to automatically sync with router (optional)
  // ignoredViews: ["homepage"], // Don't trigger events for specified router names (case insensitive) (optional)
  trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
});

new Vue({
  router,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
