import Vue from "vue";
import VueRouter from "vue-router";

import ContentDetail from "./views/ContentDetail";
import HashtagDetail from "./views/HashtagDetail";
import Mobile from "./views/Mobile";
import OwnerDetail from "./views/OwnerDetail";
import PublisherDetail from "./views/PublisherDetail";
import TaggerDetail from "./views/TaggerDetail";

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
      path: "/content/:type/:contract/:id",
      name: "content-detail",
      component: ContentDetail,
    },
    {
      path: "/hashtag/:hashtag",
      name: "hashtag-detail",
      component: HashtagDetail,
    },
    {
      path: "/owner/:address",
      name: "owner-detail",
      component: OwnerDetail,
    },
    {
      path: "/publisher/:address",
      name: "publisher-detail",
      component: PublisherDetail,
    },
    {
      path: "/tagger/:address",
      name: "tagger-detail",
      component: TaggerDetail,
    },
  ],
});
