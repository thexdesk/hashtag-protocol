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
  mounted() {
    this.getDoc();
  },
  methods: {
    /**
     * Fetch the document aq markdown file passed in to the component.
     */
    getDoc: function () {
      // Load up platform.sh variables.
      var md = require("markdown-it")();
      var result = require(`raw-loader!./../assets/docs/${this.filename}.md`)
        .default;
      this.docBody = md.render(result);
    },
  },
};
</script>
