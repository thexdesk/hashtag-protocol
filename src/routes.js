import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./views/Home";
import HashtagInfo from "./views/HashtagInfo";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/hashtags",
      component: HashtagInfo
    }
  ]
});
