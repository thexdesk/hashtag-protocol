<template>
  <span>{{ value | shortEth }}</span>
</template>

<script>
export default {
  name: "EthAccount",
  props: ["value"],
};
</script>
