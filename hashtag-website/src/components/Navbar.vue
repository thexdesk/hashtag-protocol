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
      <b-navbar-item
        href="https://docs.stage-y77w3ti-nv7d6mu5vsflk.us-2.platformsh.site"
      >
        Docs
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a
            href="https://app.stage-y77w3ti-nv7d6mu5vsflk.us-2.platformsh.site"
            class="button is-primary"
          >
            App
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script></script>

<style lang="scss">
.navbar.is-fixed-top {
  padding: 0.75rem 0;
}
</style>
