<template>
  <b-carousel
    :autoplay="false"
    :indicator-inside="false"
    animated="fade"
    indicator-style="is-boxes"
  >
    <b-carousel-item v-for="(schema, i) in taggingSchema" :key="i">
      <span class="image">
        <img :src="require(`../public/assets/img/${schema.img}.png`)" />
      </span>
    </b-carousel-item>
  </b-carousel>
</template>

<script>
export default {
  name: "SchemaSlideshow",
  data() {
    // prettier-ignore
    return {
      taggingSchema: [
        {
          img: "tagging-contracts-roadmap",
        },
        {
          img: "tagging-schema-many-many",
        },
      ],
    };
  },
};
</script>
