<template>
  <span>
    <b-tooltip :label="value" position="is-bottom" type="is-dark">
      <router-link
        :to="{ name: 'publisher-detail', params: { publisher: value } }"
      >
        {{ value | shortEth }}
      </router-link>
    </b-tooltip>
  </span>
</template>

<script>
export default {
  name: "PublisherLink",
  props: ["value"],
};
</script>
