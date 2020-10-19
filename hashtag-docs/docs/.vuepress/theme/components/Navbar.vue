<template>
  <b-navbar :fixed-top="true" class="container">
    <template slot="brand">
      <b-navbar-item tag="a" :href="this.website">
        <img
          src="@theme/assets/logo.svg"
          alt="Content tagging for the decentralized web"
        />
        <span>Hashtag</span>
      </b-navbar-item>
    </template>
    <template slot="start"></template>
    <template slot="end">
      <b-navbar-item tag="a" :href="this.website"> Developers </b-navbar-item>
      <b-navbar-item tag="router-link" to="/"> Docs </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a :href="this.app" class="button is-primary is-outlined"> App </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "External",
};
</script>

<style lang="scss">
.navbar {
  padding: 0.75rem 0;
}
</style>
