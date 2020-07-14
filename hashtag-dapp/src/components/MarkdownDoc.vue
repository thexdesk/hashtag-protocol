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
      var result;
      var md = require("markdown-it")();
      // TODO: Figure out how to use vuepress markdown-loader
      // instead of raw-loader.
      switch (this.docType) {
        case "faq":
          result = require(`raw-loader!../../../hashtag-docs/docs/guide/faqs/${this.filename}.md`)
            .default;
          break;
        case "help":
          result = require(`raw-loader!../../../hashtag-docs/docs/help/${this.filename}.md`)
            .default;
          break;
        default:
          result = "## markdown document not found.";
      }
      this.docBody = md.render(result);
    },
  },
};
</script>
