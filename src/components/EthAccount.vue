<template>
  <span v-if="ens">
    {{ ens }}
  </span>
  <span v-else>
    {{ value | shortEth }}
  </span>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "EthAccount",
  props: ["value"],
  computed: mapGetters(["homesteadProvider"]),
  data() {
    return {
      ens: null,
    };
  },
  async mounted() {
    this.ens = await this.homesteadProvider.lookupAddress(this.value);
  },
};
</script>
