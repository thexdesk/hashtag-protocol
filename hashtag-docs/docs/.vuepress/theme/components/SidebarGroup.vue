<template>
  <div>
    <p class="menu-label" :class="{ open }" @click="$emit('toggle')">
      <span
        v-if="item.icon"
        class="icon sidebar-link-icon"
        :class="item.iconClass"
        ><i :class="item.icon"></i
      ></span>
      <span>{{ item.title }}</span>
      <span
        class="arrow"
        v-if="collapsable"
        :class="open ? 'down' : 'right'"
      ></span>
    </p>
    <ul class="menu-list" ref="items" v-if="open || !collapsable">
      <li v-for="(child, i) in item.children" :key="i">
        <SidebarLink :item="child" />
      </li>
    </ul>
  </div>
</template>

<script>
import SidebarLink from "./SidebarLink.vue";

export default {
  name: "SidebarGroup",
  props: ["item", "first", "open", "collapsable"],
  components: { SidebarLink },
};
</script>

<style lang="scss">
.menu-label {
  padding-top: 1em;
}
</style>
