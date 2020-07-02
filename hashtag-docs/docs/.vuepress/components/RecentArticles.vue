<template>
<div>
  <ul>
    <li v-for="post in recentFiles">
      <a :href="post.path">{{post.title}}</a>
    </li>
  </ul>
{{ faqs }}
</div>
</template>

<script>

//import txt from 'raw-loader!./guide/faqs/faq1.md';
// const media = require('../../guide/faqs/faq1.txt');
function test(postPath) {
    //return require("raw-loader!../../" + postPath + ".md")
}

const media = test('guide/faqs/faq1');

export default {
  data: function() {
    return {
      faqs: null,
    }
  },
  computed: {
    recentFiles() {
      let files = this.$site.pages.filter(p => {
        return p.path.indexOf('/faqs/') >= 0;
      });

      return files;
    }
  },
  created: function() {
    this.getFaqs();

  },
  methods: {
    getFaqs: function () {
      console.log(media.default);
      this.faqs = 'hello';
      console.log(this.faqs);
    }
  }
}

</script>
