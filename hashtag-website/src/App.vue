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
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");
@import url("https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css");

$primary: #24ae60;
/* stylelint-disable function-name-case */
$primary-invert: findColorInvert($primary);
$primary-light: findLightColor($primary);

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
//$body-background-color: $grey-lighter;
$link: $primary;
$link-hover: $primary;

a:hover {
  text-decoration: underline;
}

//$title-color: $black-ter;
//$subtitle-color: $black-ter;

$divider-background-color: $grey;
$footer-padding: 3rem 1.5rem 6rem;

// Removes hamburger in global nav.
$navbar-breakpoint: 414px;
$navbar-item-hover-background-color: $white;

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

.navbar {
  .navbar-brand {
    img {
      margin-right: 0.4rem;
    }

    a.navbar-item,
    a.navbar-item:hover {
      color: $dark;
      text-decoration: none;

      h1 {
        font-size: 1.25rem;
        font-weight: 700;
      }
    }
  }

  .navbar-end {
    .navbar-item {
      font-weight: 700;
    }

    .router-link-active {
      color: $primary;
    }
  }
}

// Padding. This can be removed in Bulma 0.9.0
.pt-1 {
  padding-top: 1rem;
}

.pb-1 {
  padding-bottom: 1rem;
}

@import "@creativebulma/bulma-divider";
@import "bulma";
@import "buefy/src/scss/buefy";
</style>
