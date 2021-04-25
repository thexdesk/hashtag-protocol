<template>
  <div class="has-text-centered has-background-white">
    <div class="mb-6">
      <img src="../assets/hashtag_protocol.gif" />
    </div>
    <p class="title has-text-weight-semibold">Minting in progress</p>
    <p class="mb-6">
      When complete, this screen will update or you may close this window and
      receive updates in the main site.
    </p>
    <a :href="etherscanUrl" target="_blank">view on Etherscan</a>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "TxnModalSent",
  props: {
    newHashtag: String,
    txnType: String,
  },
  computed: {
    ...mapGetters(["transactionState"]),
    etherscanUrl: function () {
      return `${this.etherscanBaseUrl}/tx/${this.transactionState.hash}`;
    },
  },
};
</script>
