<template>
  <span>{{ new Date(parseInt(value) * 1000) | moment("from") }}</span>
</template>

<script>
export default {
  name: "TimestampFrom",
  props: ["value"],
};
</script>
