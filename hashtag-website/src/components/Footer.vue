<template>
  <footer class="footer">
    <div class="block newsletter">
      <div class="block container has-text-centered has-text-white-ter">
        <p class="is-size-3 has-text-weight-bold">#KeepMeUpdated</p>
        <p class="has-text-grey-light">
          Sign up to our newsletter for occasional updates about our movement to
          decentralize hashtags
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
            <a
              :href="this.build"
              target="_blank"
              title="Github"
              class="navbar-item"
            >
              <span class="icon"
                ><i class="mdi mdi-github-circle mdi-24px"></i
              ></span>
            </a>
            <a
              :href="this.build"
              target="_blank"
              title="Discord"
              class="is-dark navbar-item"
            >
              <span class="icon"><i class="mdi mdi-discord mdi-24px"></i></span>
            </a>
            <a
              href="mailto:info@hashtag-protocol.org"
              title="info@hashtag-protocol.org"
              class="is-dark navbar-item"
              target="_blank"
            >
              <span class="icon"><i class="mdi mdi-email mdi-24px"></i></span>
            </a>
            <a
              href="https://hashtagprotocol.substack.com"
              title="Substack"
              class="navbar-item"
              target="_blank"
            >
              <span class="icon substack"><i></i></span>
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
    padding: 9rem 0;
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

.substack {
  background-position-y: 2px;
  background-position-x: 2px;
  background-image: url("data:image/svg+xml,%3Csvg fill='%234a4a4a' width='136px' height='155px' viewBox='0 0 136 155' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%3Crect id='Rectangle' x='0' y='0' width='136' height='19'%3E%3C/rect%3E%3Crect id='Rectangle' x='0' y='35' width='136' height='19'%3E%3C/rect%3E%3Cpolygon id='Path' points='0 69 136 69 136 155 68 117 0 155'%3E%3C/polygon%3E%3C/svg%3E");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  &:hover {
    background-image: url("data:image/svg+xml,%3Csvg fill='%2324ae60' width='136px' height='155px' viewBox='0 0 136 155' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%3Crect id='Rectangle' x='0' y='0' width='136' height='19'%3E%3C/rect%3E%3Crect id='Rectangle' x='0' y='35' width='136' height='19'%3E%3C/rect%3E%3Cpolygon id='Path' points='0 69 136 69 136 155 68 117 0 155'%3E%3C/polygon%3E%3C/svg%3E");
  }
}
</style>
