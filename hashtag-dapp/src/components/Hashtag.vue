<template>
  <span class="has-text-weight-bold">
    <router-link :to="{ name: 'hashtag-detail', params: { hashtag: value } }">
      #{{ value }}
    </router-link>
  </span>
</template>

<script>
export default {
  name: "Hashtag",
  props: ["value"],
};
</script>
