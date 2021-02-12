<template>
  <footer class="footer">
    <nav class="level container">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <p>
            <strong>© {{ this.year }} Hashtag Protocol, Inc.</strong>
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
            <a
              href="https://hashtagprotocol.substack.com"
              title="Substack email newsletter"
              class="navbar-item button is-dark is-outlined substack"
            >
              Get Updates
            </a>
          </div>
        </div>
      </div>
    </nav>
    <p class="container">
      <slot></slot>
    </p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
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
  position: absolute;
  bottom: 0;
  width: 100%;

  a {
    &.navbar-item {
      border-radius: 3px;
      &:hover {
        background: none;
      }
    }
  }
}

.button.is-dark.is-outlined.substack {
  margin: 0 0.5rem;
  color: $grey-dark;
  border-color: $grey-dark;

  &:hover {
    color: $white;
    background-color: $primary;
    border-color: $primary;
  }
}
</style>
