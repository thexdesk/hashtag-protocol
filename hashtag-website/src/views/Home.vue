<template>
  <div class="body">
    <section class="nav has-background-white">
      <div class="container">
        <Navbar></Navbar>
      </div>
    </section>
    <section class="main">
      <div class="section is-medium has-background-white hero">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column">
              <h1 class="is-size-1 title is-spaced has-text-white-invert">
                An experimental content tagging protocol for the decentralized
                internet
              </h1>
              <div class="is-size-4 content has-text-white-invert">
                <p>
                  Hashtag is a simple, decentralized protocol built for
                  developers to tokenize hashtag strings, link them with online
                  media and surface this data for use in networks, platforms and
                  applications.
                </p>
                <p>
                  Start building with Hashtag Protocol.
                </p>
              </div>
            </div>
            <div class="column">
              <span class="image">
                <img :src="require(`../assets/img/hero.png`)" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default {
  name: "Home",
  components: {
    Footer,
    Navbar,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.main {
  .hero {
    padding-bottom: 0;
  }
}
</style>
