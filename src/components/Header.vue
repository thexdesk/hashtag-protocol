<template>
  <header>
    <router-link to="/"><h1>Hashtag</h1></router-link>
    <ul>
      <li><code>{{ account | shortEth }}</code></li>
    </ul>
  </header>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "header",
  computed: mapGetters(["account"]),
};
</script>

<style>
h1 {
  color: #282828 !important;
}
</style>
