<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="../assets/logo-white.svg"
          alt="Content tagging for the decentralized web"
        />
        <h1>Hashtag</h1>
      </b-navbar-item>
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
          <a
            v-if="account !== 'Connect wallet'"
            class="button is-primary is-outlined"
            @click="changeWallet"
          >
            {{ account | shortEth }}
          </a>
          <a v-else class="button is-primary is-outlined" @click="connect">
            {{ account }}
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
  methods: {
    connect() {
      this.$store.dispatch("bootstrap");
    },
    changeWallet() {
      this.$store.dispatch("changeWallet");
    },
  },
};
</script>
