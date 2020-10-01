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

      // Section(s) is ued by dropdown menu in header component.
      sections: [
        "dashboard",
        "hashtags",
        "owners",
        "publishers",
        "taggers",
        "nfts",
      ],
      // Active section.
      section: "dashboard",
    };
  },
  created() {
    this.setDevBaseUrls();
    this.setSection();
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
     * Sets a path and section global variable for
     * use by the global nav dropdown menu.
     */
    setSection() {
      var baseUrl = new URL(window.location);
      // Set section set based on the detail
      // page. For example, if user is on
      // /owner/id we want to set the section as "owners".
      var path_parts = baseUrl.pathname.split("/");
      if (path_parts[1] === "") {
        this.section = "dashboard";
      } else {
        // Get the first part of the path.
        var path = path_parts[1];
        // See if the path is in one of the sections.
        // eg. "hashtag" or "hashtags" and set the global
        // section accordingly.
        for (var i = 0; i < this.sections.length; i++) {
          if (this.sections[i].includes(path)) {
            this.section = this.sections[i];
            break;
          }
        }
      }
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
    setDevBaseUrls() {
      var baseUrl = new URL(window.location);
      var parts = baseUrl.hostname.split(".");
      if (parts.includes("platformsh") && parts.includes("app")) {
        // We are on a Platform.sh development environment under
        // the app subdomain.
        // Let's strip out the app subdomain.
        parts.shift();
        this.website = "https://" + parts.join(".");
        var docsUrl = new URL(this.website);
        docsUrl.hostname = "docs." + docsUrl.hostname;
        this.docs = docsUrl;
      }
    },
  },
});
