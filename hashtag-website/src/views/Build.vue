<template>
  <div class="body">
    <section class="nav has-background-white">
      <div class="container">
        <Navbar></Navbar>
      </div>
    </section>
    <div class="section is-medium has-background-white">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-5">
            <h1 class="is-size-1 title is-spaced">
              Build with us.
            </h1>
            <div class="content is-size-5">
              <p>
                Hashtag Protocol is an experimental, pre-product-market fit
                project that needs your help! We have a working,
                proof-of-concept demo, and a small team of developers who
                continue to develop the project.
              </p>
              <p>
                Besides general inquiries, harsh critiques and glowing
                complements, we would especially love to hear from you if you
                are one of the following:
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
                  Web application developers (blockchain, general UI/UX) who are
                  interested in the mission of the project and would like to get
                  involved “early on”.
                </li>
                <li>
                  Seed stage/pre-product-market fit venture capitalists who want
                  to disrupt the vast social, informational and financial equity
                  of hashtags stored in centralized social networks.
                </li>
              </ul>
              <p>
                If you are interested in getting involved or learning more,
                please contact us today.
              </p>
            </div>
          </div>
          <div class="column is-offset-1 is-4">
            <ContactUs />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default {
  name: "Developers",
  components: {
    Footer,
    Navbar,
    ContactUs,
  },
};
</script>

<style lang="scss">
.nav {
  padding: 0.75rem 0;
}
</style>
