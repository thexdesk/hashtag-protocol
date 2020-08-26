import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./views/Home";
import Developers from "./views/Developers";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/developers",
      name: "developers",
      component: Developers,
    },
  ],
});
