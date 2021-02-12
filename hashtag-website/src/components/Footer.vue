<template>
  <footer class="footer">
    <div class="block newsletter">
      <div class="block container has-text-centered has-text-white-ter">
        <p class="is-size-3 has-text-weight-bold">#KeepMeUpdated</p>
        <p class="has-text-grey-light">
          Sign up to our newsletter for occasional updates about social tagging
          on the decentralized web
        </p>
      </div>
      <NewsletterForm />
    </div>
    <nav class="level container">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <p class="is-size-6">
            <small>
              © {{ this.year }} Hashtag Protocol, Inc. All Rights Reserved
            </small>
          </p>
        </div>
      </div>
      <!-- Right side -->
      <div class="level-right">
        <div class="level-item">
          <div class="level is-mobile">
            <a :href="this.build" title="Github" class="navbar-item">
              <span class="icon"
                ><i class="mdi mdi-github-circle mdi-24px"></i
              ></span>
            </a>
            <a :href="this.build" title="Discord" class="is-dark navbar-item">
              <span class="icon"><i class="mdi mdi-discord mdi-24px"></i></span>
            </a>
            <a
              href="mailto:info@hashtag-protocol.org"
              title="info@hashtag-protocol.org"
              class="is-dark navbar-item"
            >
              <span class="icon"><i class="mdi mdi-email mdi-24px"></i></span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </footer>
</template>

<script>
import NewsletterForm from "./NewsletterForm";

export default {
  name: "Footer",
  components: {
    NewsletterForm,
  },
  data() {
    return {
      build: "",
      year: "2020",
    };
  },
  mounted() {
    this.build = this.website + "/build";
    this.year = new Date().getFullYear();
  },
};
</script>

<style scoped lang="scss">
.footer {
  .newsletter {
    padding: 3rem 0 4rem;
    background-color: $grey-dark;
  }

  a {
    &.navbar-item {
      border-radius: 3px;
      &:hover {
        background: none;
      }
    }
  }
}
</style>
