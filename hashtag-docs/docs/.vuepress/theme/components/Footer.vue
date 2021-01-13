<template>
  <footer class="footer">
    <nav class="level container">
      <!-- Left side -->
      <div class="level-item">
        <p>© Hashtag Protocol, Inc. 2020</p>
      </div>

      <!-- Right side -->
      <div class="level-item">
        <a :href="this.build" title="Github" class="navbar-item">
          <span class="icon"
            ><i class="mdi mdi-github-circle mdi-24px"></i
          ></span>
        </a>
        <a :href="this.build" title="Discord" class="navbar-item">
          <span class="icon"><i class="mdi mdi-discord mdi-24px"></i></span>
        </a>
        <a
          href="https://hashtagprotocol.substack.com"
          title="Substack"
          class="navbar-item"
        >
          <span class="icon substack"><i></i></span>
        </a>
      </div>
    </nav>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      build: "",
    };
  },
  mounted() {
    this.build = this.website + "/build";
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
