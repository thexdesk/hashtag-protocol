<template>
  <span>{{ value | toEth | to2Dp }} Ξ</span>
</template>

<script>
export default {
  name: "EthAmount",
  props: ["value"],
};
</script>
