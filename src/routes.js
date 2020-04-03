import Vue from "vue";
import VueRouter from "vue-router";

import Hashtags from "./views/Hashtags";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Hashtags,
    },
  ],
});
