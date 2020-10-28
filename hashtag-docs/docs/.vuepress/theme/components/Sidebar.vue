<template>
  <div class="menu">
    <slot name="top" />
    <template v-if="items.length">
      <div v-for="(item, i) in items" :key="i">
        <template v-if="item.type === 'group'">
          <SidebarGroup
            :item="item"
            :first="i === 0"
            :open="i === openGroupIndex"
            :collapsable="item.collapsable"
            @toggle="toggleGroup(i)"
          />
        </template>
        <template v-else>
          <ul class="menu-list">
            <li><SidebarLink :item="item" /></li>
          </ul>
        </template>
      </div>
    </template>
    <slot name="bottom" />
  </div>
</template>

<script>
import SidebarGroup from "./SidebarGroup.vue";
import SidebarLink from "./SidebarLink.vue";
import { isActive } from "../util";

export default {
  components: { SidebarGroup, SidebarLink },
  props: ["items"],
  data() {
    return {
      openGroupIndex: 0,
    };
  },
  created() {
    this.refreshIndex();
  },
  watch: {
    $route() {
      this.refreshIndex();
    },
  },
  methods: {
    refreshIndex() {
      const index = resolveOpenGroupIndex(this.$route, this.items);
      if (index > -1) {
        this.openGroupIndex = index;
      }
    },
    toggleGroup(index) {
      this.openGroupIndex = index === this.openGroupIndex ? -1 : index;
    },
    isActive(page) {
      return isActive(this.$route, page.path);
    },
  },
};

function resolveOpenGroupIndex(route, items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (
      item.type === "group" &&
      item.children.some((c) => isActive(route, c.path))
    ) {
      return i;
    }
  }
  return -1;
}
</script>

<style lang="scss"></style>
