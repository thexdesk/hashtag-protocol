<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'home' }">
        <img
          src="../assets/logo.svg"
          alt="Content tagging for the decentralized web"
        />
        <h1>Hashtag</h1>
      </b-navbar-item>
    </template>
    <template slot="start"></template>
    <template slot="end">
      <b-navbar-item tag="router-link" :to="{ name: 'developers' }">
        Developers
      </b-navbar-item>
      <b-navbar-item :href="this.docs">
        Docs
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a :href="this.app" class="button is-primary">
            App
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "External",

  data() {
    return {
      app: "https://app.hashtag-protocol.org",
      docs: "https://docs.hashtag-protocol.org",
    };
  },
  created() {
    this.buildDevLinks();
  },
  methods: {
    /**
     * Build nav links for Platform.sh that adapt to environment.
     *
     * Sample platform development instance urls
     * https://app.pr-75-pnnelki-nv7d6mu5vsflk.us-2.platformsh.site/ is served by application `2-hashtag-dapp`
     * https://docs.pr-75-pnnelki-nv7d6mu5vsflk.us-2.platformsh.site/ is served by application `1-hashtag-docs`
     * https://pr-75-pnnelki-nv7d6mu5vsflk.us-2.platformsh.site/ is served by application `3-hashtag-website`
     *
     */
    buildDevLinks() {
      var baseUrl = new URL(window.location.origin);
      var parts = baseUrl.hostname.split(".");

      if (parts.includes("platformsh")) {
        // We are on a Platform.sh development environment.
        var docsUrl = baseUrl;
        docsUrl.hostname = "docs." + docsUrl.hostname;
        this.docs = docsUrl;

        var appUrl = baseUrl;
        appUrl.hostname = "app." + appUrl.hostname;
        this.app = appUrl;
      }
    },
  },
};
</script>

<style lang="scss">
.navbar.is-fixed-top {
  padding: 0.75rem 0;
}
</style>
