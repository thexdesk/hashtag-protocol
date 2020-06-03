<template>
  <b-tooltip :label="value" position="is-bottom" type="is-dark">
    <span v-if="route">
      <router-link :to="{ name: route, params: { address: value } }">
        <span v-if="ens">
          {{ ens }}
        </span>
        <span v-else>
          {{ value | shortEth }}
        </span>
      </router-link>
    </span>
    <span v-else>
      <span v-if="ens">
        {{ ens }}
      </span>
      <span v-else>
        {{ value | shortEth }}
      </span>
    </span>
  </b-tooltip>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "EthAccount",
  props: {
    value: String,
    route: String,
  },
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
