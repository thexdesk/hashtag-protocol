import Vue from "vue";
import VueRouter from "vue-router";

import Mobile from "./views/Mobile";
import HashtagDetail from "./views/HashtagDetail";
import PublisherDetail from "./views/PublisherDetail";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Mobile,
    },
    {
      path: "/hashtag/:hashtag",
      name: "hashtag-detail",
      component: HashtagDetail,
    },
    {
      path: "/publisher/:publisher",
      name: "publisher-detail",
      component: PublisherDetail,
    },
  ],
});
