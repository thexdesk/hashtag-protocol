<template>
  <!-- repo link -->
  <a
    v-if="repoLink"
    :href="repoLink"
    class="repo-link"
    target="_blank"
    rel="noopener noreferrer"
  >
    {{ repoLabel }}
    <OutboundLink />
  </a>
</template>

<script>
export default {
  name: "RepoLink",
  computed: {
    repoLink() {
      const { repo } = this.$site.themeConfig;
      if (repo) {
        return /^https?:/.test(repo) ? repo : `https://github.com/${repo}`;
      }
      return null;
    },

    repoLabel() {
      if (!this.repoLink) return;
      if (this.$site.themeConfig.repoLabel) {
        return this.$site.themeConfig.repoLabel;
      }

      const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0];
      const platforms = ["GitHub", "GitLab", "Bitbucket"];
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];
        if (new RegExp(platform, "i").test(repoHost)) {
          return platform;
        }
      }

      return "Source";
    },
  },
};
</script>
