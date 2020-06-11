import Vue from "vue";
import VueRouter from "vue-router";

import Dashboard from "./views/Dashboard";
import Hashtags from "./views/Hashtags";
import HashtagDetail from "./views/HashtagDetail";
import Nfts from "./views/Nfts";
import NftDetail from "./views/NftDetail";
import Owners from "./views/Owners";
import OwnerDetail from "./views/OwnerDetail";
import Publishers from "./views/Publishers";
import PublisherDetail from "./views/PublisherDetail";
import Taggers from "./views/Taggers";
import TaggerDetail from "./views/TaggerDetail";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/hashtags",
      name: "hashtags",
      component: Hashtags,
    },
    {
      path: "/hashtag/:hashtag",
      name: "hashtag-detail",
      component: HashtagDetail,
    },
    {
      path: "/nfts",
      name: "nfts",
      component: Nfts,
    },
    {
      path: "/:type/:contract/:id",
      name: "nft-detail",
      component: NftDetail,
    },
    {
      path: "/owners",
      name: "owners",
      component: Owners,
    },
    {
      path: "/owner/:address",
      name: "owner-detail",
      component: OwnerDetail,
    },
    {
      path: "/publishers",
      name: "publishers",
      component: Publishers,
    },
    {
      path: "/publisher/:address",
      name: "publisher-detail",
      component: PublisherDetail,
    },
    {
      path: "/taggers",
      name: "taggers",
      component: Taggers,
    },
    {
      path: "/tagger/:address",
      name: "tagger-detail",
      component: TaggerDetail,
    },
  ],
});
