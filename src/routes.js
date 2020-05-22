import Vue from "vue";
import VueRouter from "vue-router";

import Mobile from "./views/Mobile";
import HashtagDetail from "./views/HashtagDetail";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Mobile,
    },
    {
      path: "/hashtag",
      component: HashtagDetail,
    },
  ],
});
