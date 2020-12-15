<template v-if="this.$page.headers">
  <div>
    <p class="menu-label open">
      <span>On this page</span>
    </p>
    <HeaderList
      :items="groupedHeaders"
      :list-type="listTypes"
      class="menu-list is-size-7"
    />
  </div>
</template>

<script>
import HeaderList from "./HeaderList.vue";
export default {
  props: {
    listType: {
      type: [String, Array],
      default: "ul",
    },
    includeLevel: {
      type: Array,
      default: () => [2, 3],
    },
  },
  components: { HeaderList },
  computed: {
    listTypes() {
      return typeof this.listType === "string"
        ? [this.listType]
        : this.listType;
    },
    groupedHeaders() {
      if (this.$page.headers) {
        return this.groupHeaders(this.$page.headers).list;
      } else {
        return null;
      }
    },
  },
  methods: {
    groupHeaders(headers, startLevel = 1) {
      const list = [];
      let index = 0;
      while (index < headers.length) {
        const header = headers[index];
        if (header.level < startLevel) break;
        if (header.level > startLevel) {
          const result = this.groupHeaders(headers.slice(index), header.level);
          if (list.length) {
            list[list.length - 1].children = result.list;
          } else {
            list.push(...result.list);
          }
          index += result.index;
        } else {
          if (
            header.level <= this.includeLevel[1] &&
            header.level >= this.includeLevel[0]
          ) {
            list.push({ ...header });
          }
          index += 1;
        }
      }
      return { list, index };
    },
  },
};
</script>
