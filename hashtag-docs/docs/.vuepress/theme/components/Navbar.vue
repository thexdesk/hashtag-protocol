<template>
  <b-navbar :fixed-top="true" class="container">
    <template slot="brand">
      <b-navbar-item tag="a" :href="this.website">
        <img
          src="@theme/assets/logo.svg"
          alt="Content tagging for the decentralized web"
        />
        <span>Hashtag</span>
      </b-navbar-item>
    </template>
    <template slot="start"></template>
    <template slot="end">
      <b-navbar-item tag="a" :href="this.developers">
        Developers
      </b-navbar-item>
      <b-navbar-item tag="router-link" to="/"> Docs </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a :href="this.app" class="button is-primary is-outlined"> App </a>
        </div>
      </b-navbar-item>
      <div class="is-hidden-tablet">
        <hr />
        <b-navbar-item>
          <Sidebar :items="sidebarItems"></Sidebar>
        </b-navbar-item>
      </div>
    </template>
  </b-navbar>
</template>

<script>
import Sidebar from "./Sidebar";
import { resolveSidebarItems } from "../util";

export default {
  name: "Navbar",
  components: {
    Sidebar,
  },
  data() {
    return {
      developers: "",
    };
  },
  mounted() {
    this.developers = this.website + "/developers";
  },
  computed: {
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    },
  },
};
</script>

<style lang="scss">
.navbar {
  padding: 0.75rem 0;
}

.button.is-primary.is-outlined {
  transition: all 0.3s ease;
}
</style>
