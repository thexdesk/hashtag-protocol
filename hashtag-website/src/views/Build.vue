<template>
  <div class="body">
    <div class="content-wrapper">
      <section class="section nav">
        <div class="container">
          <Navbar></Navbar>
        </div>
      </section>
      <div class="section is-medium has-background-white">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-5">
              <h1 class="is-size-1 title is-spaced">Build with us.</h1>
              <div class="content is-size-5">
                <p>
                  Hashtag Protocol is an experimental, pre-product-market fit
                  project that needs your help! We have a
                  <a href="https://app.hashtag-protocol.org" target="_blank"
                    >proof-of-concept demo</a
                  >
                  and a small team who continue to develop the project.
                </p>
                <p>
                  Besides questions, suggestions or critiques, we are especially
                  interested in hearing from the following:
                </p>
                <ul>
                  <li>
                    Non-fungible token projects who would like to have their
                    digital assets be taggable by Hashtag Tokens during the beta
                    and subsequent mainnet launch of the project.
                  </li>
                  <li>
                    App / dApp developers interested in offering decentralized
                    asset/content tagging functionality to their users or their
                    application.
                  </li>
                  <li>
                    Web application developers (blockchain, general UI/UX) who
                    are interested in the mission of the project and would like
                    to get involved “early on”.
                  </li>
                  <li>
                    Seed stage/pre-product-market fit VCs who want to disrupt
                    the centralized social networks' strangle hold on the vast
                    social, informational and financial equity of stored in
                    hashtags.
                  </li>
                </ul>
                <p>
                  To get in touch, please email
                  <a href="mailto:contact@hashtag-protocol.org"
                    >contact@hashtag-protocol.org</a
                  >
                </p>
              </div>
            </div>
            <div class="column is-offset-1 is-4"></div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default {
  name: "Developers",
  components: {
    Footer,
    Navbar,
  },
};
</script>

<style lang="scss"></style>
