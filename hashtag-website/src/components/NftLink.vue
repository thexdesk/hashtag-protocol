<template>
  <span class="has-text-weight-bold">
    <a :href="this.link" target="blank">{{ name }}</a>
  </span>
</template>

<script>
export default {
  name: "NftLink",
  props: ["name", "type", "contract", "id"],
  created() {
    // Note: this.app set in mixin/global.js
    this.link =
      this.app + "/" + this.type + "/" + this.contract + "/" + this.id;
  },
};
</script>
