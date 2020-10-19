<template>
  <div class="body">
    <section class="nav has-background-white">
      <div class="container"><Navbar /></div>
    </section>
    <section class="main">
      <div class="container">
        <div class="columns">
          <div class="column is-one-third-tablet is-one-quarter-desktop">
            <div class="sticky">
              <Sidebar :items="sidebarItems"></Sidebar>
            </div>
          </div>
          <div class="column">
            <div class="content">
              <Content />
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { resolveSidebarItems } from "../util";

export default {
  name: "Layout",

  components: {
    Footer,
    Sidebar,
    Navbar,
  },

  computed: {
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    },
  },
};
</script>

<style lang="scss">
body.has-navbar-fixed-top {
  padding-top: 5.25rem;
}

.sticky {
  position: sticky;
  top: 84px;
}
</style>
