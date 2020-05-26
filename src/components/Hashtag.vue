<template>
  <span>
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
