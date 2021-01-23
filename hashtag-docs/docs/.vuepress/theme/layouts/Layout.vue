<template>
  <div class="body">
    <section class="nav has-background-white">
      <div class="container"><Navbar /></div>
    </section>
    <section class="main">
      <div class="container">
        <div class="columns">
          <div class="column is-hidden-mobile is-one-quarter-tablet">
            <div>
              <Sidebar :items="sidebarItems"></Sidebar>
            </div>
          </div>
          <div class="column">
            <div class="content">
              <Content />
            </div>
          </div>
          <div class="column is-hidden-touch is-hidden-desktop-only is-2">
            <div class="sticky">
              <PageEdit />
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
import PageEdit from "../components/PageEdit";
import Sidebar from "../components/Sidebar";
import { resolveSidebarItems } from "@vuepress/theme-default/util/index.js";

export default {
  name: "Layout",

  components: {
    Footer,
    Navbar,
    PageEdit,
    Sidebar,
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
  padding-top: 6.25rem;
}

.navbar.is-fixed-top {
  padding: 0.75rem 0;
}

.sticky {
  position: sticky;
  top: 100px;
}

.main {
  .column {
    .content {
      padding-bottom: 3.5rem;
    }
  }
}
</style>
