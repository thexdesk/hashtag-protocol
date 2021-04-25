<template>
  <div class="mb-5">
    <table class="table is-fullwidth radius is-size-7">
      <tr>
        <td><strong>Fastest</strong><br />below 30 seconds (next block)</td>
        <td class="is-vcentered">
          {{ feeETH.fastest }} ETH (≈${{ feeUSD.fastest }})
        </td>
      </tr>
      <tr>
        <td><strong>Fast</strong><br />below 2 minutes (&lt;10 blocks)</td>
        <td class="is-vcentered">
          {{ feeETH.fast }} ETH (≈${{ feeUSD.fast }})
        </td>
      </tr>
      <tr>
        <td><strong>Average</strong><br />around 5 minutes (&lt;20 blocks)</td>
        <td class="is-vcentered">
          {{ feeETH.average }} ETH (≈${{ feeUSD.average }})
        </td>
      </tr>
      <tr>
        <td>
          <strong>Slow</strong><br />below 30 minutes (a.k.a safe-low, &lt;120
          blocks)
        </td>
        <td class="is-vcentered">
          {{ feeETH.slow }} ETH (≈${{ feeUSD.slow }})
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
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "TxnFees",
  data() {
    return {};
  },
  props: {
    txnType: String,
  },
  computed: {
    ...mapGetters([
      "mintingFeeETH",
      "mintingFeeUSD",
      "gasUpdated",
      "exchangeRateUpdated",
    ]),
    feeETH: function () {
      // txnType is passed in from parent component.
      if (this.txnType == "mint") {
        return this.mintingFeeETH;
      }
      return false;
    },
    feeUSD: function () {
      if (this.txnType == "mint") {
        return this.mintingFeeUSD;
      }
      return false;
    },
  },
};
</script>
