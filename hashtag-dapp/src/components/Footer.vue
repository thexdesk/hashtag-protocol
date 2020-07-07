<template>
  <footer class="footer">
    <nav class="level container">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <div class="content has-text-centered">
            <p>
              <strong>Hashtag Protocol</strong> by
              <a href="mailto:info@hashtag-protocol.org">Michael Paler</a>. The
              source code is licensed
              <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
              The website content is licensed
              <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
                >CC BY NC SA 4.0</a
              >.
            </p>
          </div>
        </div>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <a
          href="https://github.com/hashtag-protocol"
          target="_blank"
          title="Github"
          class="navbar-item is-hidden-mobile"
        >
          <span class="icon"
            ><i class="mdi mdi-github-circle mdi-24px"></i
          ></span>
        </a>
        <a
          href="https://discord.gg/bSEdd4n"
          target="_blank"
          title="Discord"
          class="navbar-item is-hidden-mobile"
        >
          <span class="icon"><i class="mdi mdi-discord mdi-24px"></i></span>
        </a>
      </div>
    </nav>
    <p class="container">
      <slot></slot>
    </p>
  </footer>
</template>
