<template>
  <span class="has-text-weight-bold">
    <a :href="this.link" target="blank">#{{ value }}</a>
  </span>
</template>

<script>
export default {
  name: "Hashtag",
  props: ["value"],
  created() {
    // Note: this.app set in mixin/global.js
    this.link = this.app + "/hashtag/" + this.value;
  },
};
</script>
