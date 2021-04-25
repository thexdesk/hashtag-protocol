<template>
  <div class="summary has-text-centered confirm-mint">
    <div v-if="!isOpen">
      <span class="py-6 mb-6 radius hashtag">
        <b-tag type="is-primary" size="is-large" class="has-text-weight-medium"
          >#{{ newHashtag }}</b-tag
        >
      </span>
    </div>
    <b-collapse
      v-model="isOpen"
      position="is-bottom"
      aria-id="contentIdForA11y1"
    >
      <template #trigger></template>
      <div class="box content mb-4 has-text-left has-background-grey-lighter">
        <p class="is-size-4">
          <strong>You are about to mint a HASHTAG token.</strong>
        </p>
        <p>
          In doing so, you’re joining our movement to decentralize hashtags. So
          thank you for that.
        </p>
        <p>Some important things to keep in mind:</p>
        <p>
          <span
            ><b-tag
              type="is-primary"
              size="is-medium"
              class="has-text-weight-medium"
              >#{{ newHashtag }}</b-tag
            ></span
          >
          <strong> is not editable once minted.</strong> So be sure to double
          check spelling and casing.
        </p>
        <p>
          <strong>Immediately after minting</strong>.
          <span
            ><b-tag
              type="is-primary"
              size="is-medium"
              class="has-text-weight-medium"
              >#{{ newHashtag }}</b-tag
            ></span
          >
          will join the global pool of HASHTAG tokens and be available for
          tagging content on any participating platform.
        </p>
        <p>
          <strong>Minting does not imply ownership.</strong> Instead, your
          wallet address is registered within the token as the “creator”. After
          it’s minted,
          <span
            ><b-tag
              type="is-primary"
              size="is-medium"
              class="has-text-weight-medium"
              >#{{ newHashtag }}</b-tag
            ></span
          >
          is held by Hashtag Protocol until released for auction.
        </p>
        <p>
          <strong>As the token creator,</strong> you are entitled to 40% of the
          initial auction revenue. In addition, you are entitled to 50% of the
          tagging revenue until
          <span
            ><b-tag
              type="is-primary"
              size="is-medium"
              class="has-text-weight-medium"
              >#{{ newHashtag }}</b-tag
            ></span
          >
          is purchased.
        </p>
        <p>
          <a
            class="has-text-weight-medium"
            href="https://docs.hashtag-protocol.org/essentials/protocol-overview.html"
            target="_blank"
            >Learn more about HASHTAG tokens
            <span class="icon-text has-text-primary">
              <span class="icon">
                <i class="mdi mdi-18px mdi-open-in-new"></i>
              </span>
            </span>
          </a>
        </p>
        <h3 class="is-size-4">Transaction costs</h3>
        <p>
          It costs money to use the world computer that is Ethereum. Here’s some
          estimates of how much minting a token will cost right now depending on
          transaction speed:
        </p>
        <TransactionFees v-bind:txn-type="txnType" />
        <p>
          By clicking “confirm” you will be prompted to sign a transaction in
          your crypto wallet. Signing the transaction will begin the minting
          process.
        </p>
      </div>
    </b-collapse>
    <a
      class="has-text-weight-medium"
      aria-controls="contentIdForA11y1"
      @click="isOpen = !isOpen"
    >
      <b-icon v-if="isOpen" size="is-small" icon="menu-up"></b-icon>
      {{ !isOpen ? "What the heck is going on here?" : "Close details" }}
    </a>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import TransactionFees from "./TxnFees";

export default {
  name: "TxnModal",
  components: {
    TransactionFees,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    newHashtag: String,
    txnType: String,
  },
  computed: {
    ...mapGetters(["transactionState"]),
  },
};
</script>
<style lang="scss" scoped>
.confirm-mint {
  .hashtag {
    display: inline-block;
  }
}
</style>
