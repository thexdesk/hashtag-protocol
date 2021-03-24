<template>
  <div id="app">
    <router-view></router-view>
    <div v-if="variable3 == 'development'" class="is-size-7">
      <div>{{ variable1 }}</div>
      <div>{{ variable2 }}</div>
      <div>Build type: {{ variable3 }}</div>
    </div>
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
