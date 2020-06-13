<template>
<div>
  <ul>
    <li v-for="post in recentFiles">
      <a :href="post.path">{{post.title}}</a>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed:{
    recentFiles() {
      let files = this.$site.pages.filter(p => {
        return p.path.indexOf('/faqs/') >= 0;
      });

      return files;
    }
  }
}
</script>
