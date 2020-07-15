<template>
  <div v-html="docBody"></div>
</template>
<script>
/**
 * Load up a raw markdown file from the hashtag-docs directory,
 * and return it as HTML.
 */
export default {
  name: "MarkdownDoc",
  props: {
    /**
     * Name of the doc file to load.
     */
    filename: String,
    /**
     * Type of document to load up. Corresponds to a path in HashtagDocs.
     */
    docType: String,
  },
  data() {
    return {
      docBody: null,
    };
  },
  created() {
    this.getDoc();
  },
  methods: {
    /**
     * Fetch the document aq markdown file passed in to the component.
     */
    getDoc: function () {
      // Load up platform.sh variables.
      // @see https://github.com/platformsh/config-reader-nodejs
      var config = require("platformsh-config").config();
      var md = require("markdown-it")();
      var result;
      // TODO: Figure out how to use vuepress markdown-loader
      // instead of raw-loader.
      switch (this.docType) {
        case "faq":
          if (config.isValidPlatform()) {
            // We are on Platform, pull from the network drive.
            result = require(`raw-loader!./../../network/docs/guide/faqs/${this.filename}.md`)
              .default;
          } else {
            // We are local, pull from the hashtag-docs folder in the repo.
            result = require(`raw-loader!./../../../hashtag-docs/docs/guide/faqs/${this.filename}.md`)
              .default;
          }
          break;
        case "help":
          if (config.isValidPlatform()) {
            result = require(`raw-loader!./../../network/docs/guide/help/${this.filename}.md`)
              .default;
          } else {
            result = require(`raw-loader!./../../../hashtag-docs/docs/guide/help/${this.filename}.md`)
              .default;
          }
          break;
        default:
          result = "## markdown document not found.";
      }
      this.docBody = md.render(result);
    },
  },
};
</script>
