# Documentation

The Hashtag Protocol documentation site (what you are reading), is maintained 
using the very popular [Vuepress](https://vuepress.vuejs.org/), a Vue powered
static site generator. Vuepress provides their [own in-depth
documentation](https://vuepress.vuejs.org/guide/) on how to implement and
develop a Vuepress site. Detailed here will be instructions
related to our specific implementation.

## Adding / editing pages

The quickest way to edit an existing page is by using the "Edit on Github"
button found on the upper right of every page in the documentation. Using this
method, you can edit and preview your changes right in Github and depending on
your permissions, the Github user interface will allow you to commit your
changes directly to the stage branch, or create a new branch and issue a PR
into staging.

::: warning NOTE 
If you are wanting to edit or add documentation in conjunction with
development of a different component of the platform (eg. Smart contracts), it is
recommended that you edit the Vuepress files locally in your working branch
and pull request those changes alongside your code change.
:::

## Developing locally

If you want to work directly on Vuepress documentation pages or the Vuepress
app itself, you can fire up the Vuepress local development environment, make &
test your changes locally and commit them as part of your overall issue PR.

Working from the root directory of [your fork](/develop/#developer-workflow)
of the [Hashtag Protocol
repository](https://github.com/hashtag-protocol/hashtag-protocol) navigate
into the `/hashtag-docs/` and fire up the development server

``` sh
cd hashtag-docs

# Startup the local development server
yarn serve
```

If the server builds successfully, it will provide a link to a local instance
where you can see changes made to markdown documents in realtime ("hot
reload"). Click that link or copy it into a browser.

``` ini
success [11:34:56] Build fd8c92 finished in 195 ms! ( http://localhost:8085/ )
```

::: tip
If development server hot reload stops working and/or you get a white
screen on the front-end, try using <nobr>`yarn build`</nobr> to see
build errors.
:::

### Editing pages

All of the markdown documents that power the Vuepress site are located in
`/hashtag-docs/docs/`. If you know the page, simply edit it and save. The
changes you make automatically refresh in the browser window.

::: tip
All documentation pages are written in Markdown, a widely used and [easy to
learn](https://www.markdownguide.org/basic-syntax) markup language.

In addition, Vuepress has a number of custom [markdown
extensions](https://vuepress.vuejs.org/guide/markdown.html#header-anchors)
widely used in this documentation. 
:::

### Links

Vuepress has it's own unique way for [handling internal
links](https://vuepress.vuejs.org/guide/markdown.html#links) using markdown. 

### Creating a new page

Best practice is to add new content to an existing page. However, if you need
to add a new page, proceed as follows:

1. In `/hashtag-docs/docs` add a new .md file within the section you want your
   new page to live. Note that the folder and filename will become the url.
   For example, if you put a file name `foobar.md` into the `docs/develop/`
   directory, the page will be accessed at
   `docs.hashtag-protocol.org/develop/foobar.html`
2. If you want to add your new page in the left hand nav bar, open
   `/hashtag-docs/docs/.vuepress/config.js`
3. In the `sidebar` section of the config, add an entry to the page you
   created.

    ``` js{8}
    // Add nav link called "Foobar Page" below "Documentation" 
    children: [
      ["/develop/", "Getting Started"],
      ["/develop/contracts", "Smart Contracts"],
      ["/develop/demo-app", "Demo Application"],
      ["/develop/docs", "Documentation"],
      ["/develop/foobar", "Foobar Page"],
      ["/develop/graphql", "GraphQL API"],
      ["/develop/website", "Marketing Site"],
    ],
    ```

## Theming

Our Vuepress implementation uses a custom theme located in 
`/hashtag-docs/docs/.vuepress/theme`. Our theme extends the default
Vuepress theme (`@vuepress/theme-default`) with [Bulma](https://bulma.io/) and
[Buefy](https://buefy.org/).

We chose to [extend the
default-theme](https://vuepress.vuejs.org/theme/inheritance.html) (rather than
clone it) to have access to default theme features (eg. built in search) as well
as an easier update path.

### Theme directory structure

<!-- markdownlint-disable MD013 -->
| file/folder                           | Description                   |
| -------------                         | -------------                 |
| **`assets/`**                         | A place to put static assets that can be used within layouts and components. For example: <nobr>`<img src="@theme/assets/logo.svg" />`</nobr> |
| **`components/`**                     | Vue components that can be used in theme layouts and [markdown pages](https://vuepress.vuejs.org/guide/using-vue.html#browser-api-access-restrictions).|
| **`layouts/`**                        | Page level [templates for theme](https://vuepress.vuejs.org/theme/writing-a-theme.html#layout-component). Default for all pages is `layouts/Layout.vue` |
| **`mixins/`**                         | Global Vue mixins folder for use in Vue components. |
| **`styles/`**                         | Global .SCSS styles folder for theme. |
| **`styles/theme.scss`**               | Master .SCSS file for theme. |
| **`styles/partials`**                 | .SCSS partials imported into master `styles/theme.scss` |
| **`styles/partials/_variables.scss`** | Custom styles settings file for theme. See <nobr>[Bulma variables](https://bulma.io/documentation/customize/variables/)</nobr>. |
| **`enhanceApp.js`**                   | Theme level enhancements to the parent Vuepress Vue app. We use it to pull in Buefy components |
| **`index.js`**                        | Vuepress custom theme [configuration](https://vuepress.vuejs.org/theme/option-api.html) file. |
|                                       |                               |
<!-- markdownlint-enable -->
