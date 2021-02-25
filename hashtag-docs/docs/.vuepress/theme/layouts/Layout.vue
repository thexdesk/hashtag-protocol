<template>
  <div class="body">
    <div class="content-wrapper">
      <section class="nav">
        <div class="container"><Navbar /></div>
      </section>
      <section class="section main">
        <div class="container">
          <div class="columns">
            <div class="column is-3 is-hidden-touch has-background-white-ter">
              <div>
                <Sidebar :items="sidebarItems"></Sidebar>
              </div>
            </div>
            <div
              class="column is-7-widescreen is-9-desktop is-12-touch has-background-white"
            >
              <div class="content">
                <Content />
              </div>
            </div>
            <div
              class="column is-2-desktop is-hidden-touch is-hidden-desktop-only has-background-white"
            >
              <div class="sticky">
                <PageEdit />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
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
section.main {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: $white;

  @include from($desktop) {
    background: linear-gradient(
      to right,
      $white-ter 0%,
      $white-ter 50%,
      $white 50%,
      $white 100%
    );
  }

  .column {
    padding-top: 2rem;

    .content {
      padding-bottom: 3.5rem;

      // Give content more padding from tablet upwards.
      @include from($desktop) {
        padding-left: 2rem;
      }
    }
  }
}

.sticky {
  position: sticky;
  top: 100px;
}
</style>
