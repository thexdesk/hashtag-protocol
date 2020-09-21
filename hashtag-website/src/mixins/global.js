import Vue from "vue";

Vue.mixin({
  data: function () {
    return {
      designNotes: "/docs/hashtag-protocol.pdf",
      // App and Docs base urls. Values set here are for
      // production environment. Note values are overridden
      // via devBaseUrls() when on platform.sh dev environments.
      website: "https://hashtag-protocol.org",
      app: "https://app.hashtag-protocol.org",
      docs: "https://docs.hashtag-protocol.org",
    };
  },
  created() {
    this.devBaseUrls();
  },
  methods: {
    /**
     * Pop a specific help text modal from the HelpModal component.
     * Called via $emit from within the component.
     *
     * @param {String} modal The name of the modal visibility boolean variable.
     * @public This is a public method
     */
    popModal(modal) {
      // Set the modal visiblity variable to true.
      // @see Buefy b-modal https://buefy.org/documentation/modal/
      this[modal] = true;
    },

    /**
     * Sets BaseUrls for Platform.sh that adapt to environment.
     *
     * Sample platform development instance urls
     * Hashtag Dapp https://app.pr-75-pnnelki-nv7d6mu5vsflk.us-2.platformsh.site
     * Hashtag Docs https://docs.pr-75-pnnelki-nv7d6mu5vsflk.us-2.platformsh.site
     * Hashtag Website https://pr-75-pnnelki-nv7d6mu5vsflk.us-2.platformsh.site
     *
     */
    devBaseUrls() {
      var baseUrl = new URL(window.location.origin);
      var parts = baseUrl.hostname.split(".");

      if (parts.includes("platformsh")) {
        // We are on a Platform.sh development environment.
        var docsUrl = new URL(window.location.origin);
        docsUrl.hostname = "docs." + docsUrl.hostname;
        this.docs = docsUrl;

        var appUrl = new URL(window.location.origin);
        appUrl.hostname = "app." + appUrl.hostname;
        this.app = appUrl;
      }
    },
  },
});
