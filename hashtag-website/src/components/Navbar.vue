<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'home' }">
        <img
          src="../assets/logo.svg"
          alt="Content tagging for the decentralized web"
        />
        <h1>Hashtag</h1>
      </b-navbar-item>
    </template>
    <template slot="start"></template>
    <template slot="end">
      <b-navbar-item tag="router-link" :to="{ name: 'developers' }">
        Developers
      </b-navbar-item>
      <b-navbar-item :href="this.docs"> Docs </b-navbar-item>
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

.navbar-menu {
  a {
    &.button {
      text-decoration: none;
    }
  }
}
</style>
