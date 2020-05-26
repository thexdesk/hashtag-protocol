<template>
  <span class="">{{ value | shortEth }}</span>
</template>

<script>
export default {
  name: "EthAccount",
  props: ["value"],
};
</script>
