<template>
  <div v-html="docBody"></div>
</template>
<script>
const axios = require("axios");
const md = require("markdown-it")();
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
    async getDoc() {
      axios.get(`/docs/${this.filename}.md`).then((response) => {
        this.docBody = md.render(response.data);
      });
    },
  },
};
</script>
