<template>
  <div id="app">
    <div>{{ variable1 }}</div>
    <div>{{ variable2 }}</div>
    <router-view></router-view>
  </div>
</template>

<script>
import getEnv from "@/utils/env";
export default {
  name: "App",
  data() {
    return {
      variable1: getEnv("VUE_APP_ONBOARD_NETWORK_ID"),
      variable2: getEnv("VUE_APP_HASHTAG_SUBGRAPH_URL"),
    };
  },
  components: {},
};
</script>
<style lang="scss">
@import "./styles/themes/hashtag/theme";
</style>
