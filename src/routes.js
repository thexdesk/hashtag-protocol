import Vue from "vue";
import VueRouter from "vue-router";

import Hashtags from "./views/Hashtags";
import Mobile from "./views/Mobile";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Mobile,
    },
    {
      path: "/Hashtags",
      component: Hashtags,
    },
  ],
});
