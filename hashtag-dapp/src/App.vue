<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  //mounted() {
  //  const previouslySelectedWallet = localStorage.getItem("selectedWallet");
  //
  //  if (
  //    previouslySelectedWallet != null &&
  //    previouslySelectedWallet !== "null"
  //  ) {
  //    this.$store.dispatch("bootstrap");
  //  }
  //},
};
</script>
<style lang="scss">
@import "./styles/themes/hashtag/theme";
</style>
