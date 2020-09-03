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
          <div class="column">
            <h1 class="is-size-1 title is-spaced">
              Build with us.
            </h1>
            <div class="content is-size-5">
              <p>
                Hashtag Protocol is an experimental, early stage,
                pre-product-market fit project. We have a working
                proof-of-concept prototype, and a small, active team of
                developers who continue to develop the project.
              </p>
              <p>
                Our ambitions include but are not limited to a mainnet
                product/project launch prior to January, 2022; an open source
                codebase; and being a profitable organization with a
                self-sustaining, decentralized governance (DAO).
              </p>
              <p>
                At this time, access to the project is by invitation only. This
                will change -- however, until then, we are looking for the
                following:
              </p>
              <ul>
                <li>
                  Non-fungible token projects who would like to have their
                  digital assets be taggable by Hashtag Tokens upon mainnet
                  launch of the project.
                </li>
                <li>
                  App / dApp developers who are interested in offering
                  decentralized asset/content tagging functionality to their
                  users or their application.
                </li>
                <li>
                  Experienced web application developers (blockchain, general
                  UI/UX) who are interested in the mission of the project and
                  would like to get involved “early on”.
                </li>
                <li>
                  Seed stage/pre-market fit venture capitalists who want to
                  disrupt the vast social, informational and financial equity
                  stored in hashtags hoarded by centralized social networks.
                </li>
              </ul>
              <p>
                If you are interested in getting involved please consider
                submitting the form below to tell us a bit more about you and
                your project. If it’s a good fit, we’ll invite you to our Github
                organization and Discord channel. Otherwise, please feel free to
                learn more about our value proposition to developers,
                applications and platforms, test out our sample implementation,
                or contact us if you have any questions.
              </p>
            </div>
          </div>
          <div class="column"></div>
        </div>
      </div>
    </div>
    <Footer>
      <span v-if="platform" class="has-text-grey-light">
        Platform revenue
        <eth-amount-sum
          :value1="platform.mintFees"
          :value2="platform.tagFees"
        ></eth-amount-sum>
      </span>
    </Footer>
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
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.nav {
  padding: 0.75rem 0;
}

code {
  .token.number {
    color: #fff;
  }

  .number {
    background: none;
    font-size: inherit;
    padding: 0;
    margin: 0;
    min-width: inherit;
  }
}

.create-tokens {
  .tabs {
    li {
      a {
        font-weight: bold;
      }
    }

    li:not(.is-active) {
      a {
        color: #fff;
      }

      a:hover {
        background: none;
      }
    }
  }

  .tab-content {
    padding: 0;

    pre {
      height: 400px;
      overflow-y: scroll;
      margin: 0;
    }
  }
}
</style>
