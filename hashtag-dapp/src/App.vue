<template>
  <div id="app">
    <div>{{ variable1 }}</div>
    <div>{{ variable2 }}</div>
    <div>{{ variable3 }}</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      variable1: this.$appConfig.hashtagSubgraph,
      variable2: this.$appConfig.nftSearchSubgraph,
      variable3: process.env.NODE_ENV,
    };
  },
  components: {},
};
</script>
<style lang="scss">
@import "./styles/themes/hashtag/theme";
</style>
