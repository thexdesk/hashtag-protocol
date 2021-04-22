<template>
  <div class="modal-card hashtag-modal">
    <header class="modal-card-head">
      <p
        v-if="transactionState == 'mintPreconfirmed'"
        class="modal-card-title has-text-weight-semibold has-text-centered"
      >
        Confirm HASHTAG token
      </p>
    </header>
    <section class="modal-card-body">
      <div v-if="transactionState == 'mintConfirmed'" class="has-text-centered">
        <div class="mb-6">
          <img src="../assets/loader3.svg" />
        </div>
        <p class="is-size-4 has-text-weight-semibold has-text-white">
          Please sign transaction in your wallet
        </p>
      </div>
      <div v-if="transactionState == 'txSent'" class="has-text-centered">
        <div class="mb-6">
          <img src="../assets/hashtag_protocol.gif" />
        </div>
        <p class="is-size-4 has-text-weight-semibold has-text-white">
          Transaction submitted
        </p>
        <p class="is-size-6 has-text-weight-semibold has-text-white">
          minting in progress
        </p>
      </div>
      <div v-if="transactionState == 'rejected'" class="has-text-centered">
        <b-icon icon="cancel" size="is-large" type="is-danger" class="mb-6">
        </b-icon>
        <p class="is-size-4 has-text-weight-semibold has-text-white">
          Transaction rejected
        </p>
      </div>
      <div
        v-if="transactionState == 'mintPreconfirmed'"
        class="summary has-text-centered confirm-mint"
      >
        <div>
          <span class="py-6 px-5 mx-4 mb-6 has-background-grey radius hashtag">
            <b-tag type="is-primary" size="is-large has-text-weight-bold"
              >#{{ newHashtag }}</b-tag
            >
          </span>
        </div>
        <b-collapse
          :open="false"
          position="is-bottom"
          aria-id="contentIdForA11y1"
        >
          <template #trigger="props">
            <a aria-controls="contentIdForA11y1">
              <b-icon :icon="!props.open ? 'menu-down' : 'menu-up'"></b-icon>
              {{ !props.open ? "Minting details" : "Close details" }}
            </a>
          </template>
          <div class="box content has-text-left has-background-grey-lighter">
            <h3 class="is-size-4">Minting details</h3>
            <p>
              <strong>Please confirm spelling and casing;</strong> token is not
              editable once minted.
            </p>
            <p>
              <strong>Minting does not imply ownership.</strong> Instead, your
              wallet address is registered within the token as the “creator”.
              After it’s minted, the token is held by Hashtag Protocol until
              it's released for auction.
            </p>
            <p>
              <strong>As the token creator,</strong> you are entitled to 40% of
              the sale revenue from the initial HASHTAG auction. In addition,
              you are entitled to 50% of the tagging revenue until the token is
              purchased.
            </p>
            <p>
              <a
                class="has-text-weight-medium"
                href="https://docs.hashtag-protocol.org/essentials/protocol-overview.html"
                target="_blank"
                >Learn more about HASHTAG tokenomics</a
              >
              <span class="icon-text has-text-primary">
                <span class="icon">
                  <i class="mdi mdi-18px mdi-open-in-new"></i>
                </span>
              </span>
            </p>
            <h3 class="is-size-4">Transaction costs</h3>
            <table class="table is-fullwidth radius is-size-7">
              <tr>
                <td>
                  <strong>Fastest</strong><br />below 30 seconds (next block)
                </td>
                <td>
                  {{ mintingFeeETH.fastest }} ETH (≈${{
                    mintingFeeUSD.fastest
                  }})
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Fast</strong><br />below 2 minutes (&lt;10 blocks)
                </td>
                <td>
                  {{ mintingFeeETH.fast }} ETH (≈${{ mintingFeeUSD.fast }})
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Average</strong><br />around 5 minutes (&lt;20 blocks)
                </td>
                <td>
                  {{ mintingFeeETH.average }} ETH (≈${{
                    mintingFeeUSD.average
                  }})
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Slow</strong><br />below 30 minutes (a.k.a safe-low,
                  &lt;120 blocks)
                </td>
                <td>
                  {{ mintingFeeETH.slow }} ETH (≈${{ mintingFeeUSD.slow }})
                </td>
              </tr>
              <tfoot align="center">
                <tr>
                  <th colspan="2" class="has-text-weight-normal">
                    <span>Gas price: upvest.co | Updated: {{ gasUpdated }}</span
                    ><br />
                    <span
                      >Exchange rate: coincap.io | Updated:
                      {{ exchangeRateUpdated }}</span
                    >
                  </th>
                </tr>
              </tfoot>
            </table>
            <p>
              By clicking “confirm” you will be prompted to sign a transaction
              in your crypto wallet. Signing the transaction will begin the
              minting process.
            </p>
          </div>
        </b-collapse>
      </div>
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
          transactionState == 'mintPreconfirmed'
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
          (transactionState == 'rejected' || transactionState == 'txnSent')
        "
      >
        <b-button type="is-primary" outlined @click="$emit('close')">
          Close
        </b-button>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      ethFees: null,
      ethFeeFast: null,
      //preconfirmed: true,
      //confirmed: false,
      //txnSent: true,
      //rejected: false,
    };
  },
  props: ["newHashtag"],
  computed: {
    ...mapGetters([
      "mintingFeeETH",
      "mintingFeeUSD",
      "address",
      "gasUpdated",
      "exchangeRateUpdated",
      "transactionState",
    ]),
  },
  methods: {
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
          await this.$store.dispatch(
            "updateTransactionStatePreTxn",
            "rejected"
          );
        }
      }
    },
  },
  async mounted() {
    this.updateFees();
    this.$store.dispatch("updateTransactionStatePreTxn", "mintPreconfirmed");
  },
};
</script>

<style lang="scss" scoped>
.confirm-mint {
  .hashtag {
    display: inline-block;
  }
}

.radius {
  border-radius: 0.5rem;
}
</style>
