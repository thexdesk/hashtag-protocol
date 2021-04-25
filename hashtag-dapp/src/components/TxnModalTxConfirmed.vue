<template>
  <div class="has-text-centered">
    <p class="mb-6">
      <span
        ><b-tag type="is-primary" size="is-large" class="has-text-weight-medium"
          >#{{ newHashtag }}</b-tag
        ></span
      >
    </p>
    <p class="title is-4 has-text-weight-medium">What next?</p>
    <p>Tell the world</p>
    <p>Subscribe for auction updates</p>
    <p>Mint another token</p>
    <p>tag some content</p>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "TxnModalTxConfirmed",
  props: {
    newHashtag: String,
    txnType: String,
  },
  computed: {
    ...mapGetters(["transactionState"]),
  },
};
</script>
