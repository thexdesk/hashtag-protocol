<template>
  <span>{{ value | toEth | to4Dp }} Ξ</span>
</template>

<script>
export default {
  name: "EthAmount",
  props: ["value"],
};
</script>
