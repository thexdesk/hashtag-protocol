<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="../assets/logo.svg"
          alt="Content tagging for the decentralized web"
        />
        <h1>Hashtag</h1>
      </b-navbar-item>
      <a
        href="https://github.com/buefy/buefy"
        target="_blank"
        title="Github"
        class="navbar-item"
      >
        <span class="icon"><i class="mdi mdi-github-circle mdi-24px"></i></span>
      </a>
      <a
        href="https://discordapp.com/invite/ZkdFJMr"
        target="_blank"
        title="Discord"
        class="navbar-item"
      >
        <span class="icon"><i class="mdi mdi-discord mdi-24px"></i></span>
      </a>
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
        <div>
          <b-field>
            <b-select placeholder="ETH" expanded>
              <option value="eth">ETH</option>
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="gbp">GBP</option>
            </b-select>
          </b-field>
        </div>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary is-outlined">
            {{ account | shortEth }}
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Header",
  computed: mapGetters(["account"]),
};
</script>
