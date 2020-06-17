<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {
    const previouslySelectedWallet = localStorage.getItem("selectedWallet");

    if (
      previouslySelectedWallet != null &&
      previouslySelectedWallet !== "null"
    ) {
      this.$store.dispatch("bootstrap");
    }
  },
};
</script>
<style lang="scss">
@import "bulma/sass/utilities/_all";
@import url("https://fonts.googleapis.com/css2?family=Roboto:400,600,700");
@import url("https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css");

$primary: #24ae60;
/* stylelint-disable function-name-case */
$primary-invert: findColorInvert($primary);

$colors: (
  "white": (
    $white,
    $black,
  ),
  "black": (
    $black,
    $white,
  ),
  "light": (
    $light,
    $light-invert,
  ),
  "dark": (
    $dark,
    $dark-invert,
  ),
  "primary": (
    $primary,
    $primary-invert,
  ),
  "info": (
    $info,
    $info-invert,
  ),
  "success": (
    $success,
    $success-invert,
  ),
  "warning": (
    $warning,
    $warning-invert,
  ),
  "danger": (
    $danger,
    $danger-invert,
  ),
);

// Update Bulma's global variables
$family-sans-serif: "Roboto", sans-serif;
$body-family: $family-sans-serif;
$body-background-color: $grey-lighter;
$link: $primary;

//$title-color: $black-ter;
//$subtitle-color: $black-ter;

$divider-background-color: $grey;
$footer-padding: 3rem 1.5rem 6rem;

// Removes hamburger in global nav.
$navbar-breakpoint: 414px;

$section-padding: 0.25rem 0.8rem;

@mixin my-touch {
  @media screen and (max-width: $navbar-breakpoint - 1px) {
    @content;
  }
}

@mixin my-desktop {
  @media screen and (min-width: $navbar-breakpoint) {
    @content;
  }
}

.container {
  @include until($desktop) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

.navbar-brand {
  img {
    margin-right: 0.4rem;
  }

  a.navbar-item,
  a.navbar-item:hover {
    color: $white;

    h1 {
      font-size: 1.25rem;
      font-weight: 700;
    }
  }
}

section.hero {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  margin-bottom: 2rem;

  &.dash {
    padding-bottom: 3rem;
    margin-bottom: -4rem;
  }
}

section.main {
  padding-bottom: 2rem;
}

@import "@creativebulma/bulma-divider";
@import "bulma";
@import "buefy/src/scss/buefy";
</style>
