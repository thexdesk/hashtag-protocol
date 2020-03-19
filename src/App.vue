<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script src="./assets/semantic.min.js"></script>

<script>
export default {
  name: "App",
  components: {},
  async created() {
    this.$store.dispatch('bootstrap');
  }
};
</script>

<style lang="scss">
@import "./styles/reset.css";

#app {
}
</style>
