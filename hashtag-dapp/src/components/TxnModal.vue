<template>
  <div class="modal-card transaction-modal">
    <header class="modal-card-head">
      <p
        v-if="transactionState.eventCode == 'mintPreconfirmed'"
        class="modal-card-title has-text-weight-semibold has-text-centered"
      >
        Confirm mint
      </p>
      <p
        v-if="transactionState.eventCode == 'txConfirmed'"
        class="modal-card-title has-text-weight-semibold has-text-centered"
      >
        HASHTAG token minted
      </p>
    </header>
    <section class="modal-card-body has-background-white">
      <TxnModalPreconfirmed
        v-if="transactionState.eventCode == 'mintPreconfirmed'"
        v-bind:txn-type="txnType"
        v-bind:new-hashtag="newHashtag"
      />
      <TxnModalConfirmed v-if="transactionState.eventCode == 'mintConfirmed'" />
      <TxnModalRejected v-if="transactionState.eventCode == 'rejected'" />
      <TxnModalTxSent
        v-if="
          transactionState.eventCode == 'txSent' ||
          transactionState.eventCode == 'txPool'
        "
      />
      <TxnModalTxConfirmed
        v-if="transactionState.eventCode == 'txConfirmed'"
        v-bind:txn-type="txnType"
        v-bind:new-hashtag="newHashtag"
      />
    </section>
    <footer class="modal-card-foot">
      <div class="buttons" v-if="address == null && address == undefined">
        <b-button
          icon-left="power-plug"
          class="button is-primary is-outlined"
          @click="connectWallet"
        >
          Connect wallet
        </b-button>
      </div>
      <div
        class="buttons"
        v-else-if="
          address !== null &&
          address !== undefined &&
          transactionState.eventCode == 'mintPreconfirmed'
        "
      >
        <b-button type="is-primary" outlined @click="$emit('close')">
          Cancel
        </b-button>
        <b-button type="is-primary" @click="mintHashtag"> Confirm </b-button>
      </div>
      <div
        class="buttons"
        v-else-if="
          address !== null &&
          address !== undefined &&
          (transactionState.eventCode == 'rejected' ||
            transactionState.eventCode == 'txSent')
        "
      >
        <b-button type="is-primary" @click="$emit('close')"> Close </b-button>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TxnModalPreconfirmed from "./TxnModalPreconfirmed";
import TxnModalConfirmed from "./TxnModalConfirmed";
import TxnModalRejected from "./TxnModalRejected";
import TxnModalTxSent from "./TxnModalTxSent";
import TxnModalTxConfirmed from "./TxnModalTxConfirmed";
export default {
  name: "TxnModal",
  components: {
    TxnModalConfirmed,
    TxnModalRejected,
    TxnModalPreconfirmed,
    TxnModalTxConfirmed,
    TxnModalTxSent,
  },
  data() {
    return {};
  },
  props: {
    newHashtag: String,
    txnType: String,
  },
  computed: {
    ...mapGetters(["address", "transactionState"]),
  },
  methods: {
    // Updates the transaction fees grid.
    async updateFees() {
      await this.$store.dispatch("updateFees");
    },
    async connectWallet() {
      await this.$store.dispatch("connectWallet");
    },
    // Mint new hashtag button is clicked.
    async mintHashtag() {
      try {
        await this.$store.dispatch("mint", `#${this.newHashtag}`);
      } catch (e) {
        if (e.code == 4001) {
          // user rejected txn in metamask.
          await this.$store.dispatch("updateTransactionState", {
            eventCode: "rejected",
          });
        }
      }
    },
  },
  async mounted() {
    this.updateFees();
    this.$store.dispatch("updateTransactionState", {
      eventCode: "mintPreconfirmed",
    });
  },
};
</script>
<style lang="scss" scoped></style>
