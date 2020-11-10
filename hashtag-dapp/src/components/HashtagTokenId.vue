<template>
  <div>
    {{ value }}
    <b-tooltip
      label="view on Etherscan"
      position="is-bottom"
      type="is-dark"
      size="is-small"
      :animated="true"
    >
      <a :href="this.tokenUrl" target="_blank">
        <b-icon icon="ethereum" type="is-primary" size="is-small"> </b-icon>
      </a>
    </b-tooltip>
  </div>
</template>

<script>
export default {
  name: "HashtagTokenId",
  props: ["value"],
  data() {
    return {
      tokenUrl: "",
    };
  },
  mounted() {
    this.tokenUrl = `${this.etherscanRinkby}/token/${this.contractRinkby}?a=${this.value}`;
  },
};
</script>
