<template>
  <span class="has-text-weight-bold">
    <a :href="this.link" target="blank">{{ value }}</a>
  </span>
</template>

<script>
export default {
  name: "Hashtag",
  props: ["value"],
  data() {
    // Modify HASHTAG for pretty url.
    let dest = this.value;
    dest = dest.replace("#", "");
    dest = dest.toLowerCase();
    return {
      dest: dest,
    };
  },
  created() {
    // Note: this.app set in mixin/global.js
    this.link = this.app + "/hashtag/" + this.dest;
  },
};
</script>
