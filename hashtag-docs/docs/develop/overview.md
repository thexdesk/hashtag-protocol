# Developing HASHTAG

If you are interested in helping us improve the Hashtag Protocol, this is the place
for you. Contained in this section is documentation around the structure of
our codebase as well set setting up testing environments for the various
Protocol components.


## Codebase

Hashtag Protocol codebase is stored in our [Github
repository](https://github.com/hashtag-protocol/hashtag-protocol). As of this
writing, this is a private repository. Please [contact
us](mailto:info@hashtag-protocol.org) if you need access to the repository.

The codebase is structured as a monorepo to make development and deployment
easier to manage. We hope to continue to make improvements to the monorepo
functionality, namely to "packagize" protocol components so they may be
implemented independently. To this end we are considering
[Lerna](https://lerna.js.org/). If you have experience with Lerna, and can
help us out, please let us know ([@todo](#todos)).

The repo is broken into five main sections:

<!-- markdownlint-disable MD013 -->
| Monorepo path                          |                               |
| -------------                          | -------------                 |
| <nobr>**`/hashtag-contracts/`**</nobr> | Our Solidity smart contracts. |
| **`/hashtag-dapp/`**</nobr>            | A Vue.js single page application (SPA) demo implementation. Great place to start if you want to tinker with the Protocol. |
| <nobr>**`/hashtag-docs/`**</nobr>      | A [Vuepress](https://vuepress.github.io/) implementation for publishing these docs. |
| <nobr>**`/hashtag-subgraph/`**</nobr>  | Code for our [GraphQL](https://graphql.org/learn/) API (our API for surfacing HASHTAG market and tagging data) that runs on [The Graph](https://thegraph.com/). |
| <nobr>**`/hashtag-website/`**</nobr>   | A Vue.js single page application (SPA) for our [marketing website](https://www.hashtag-protocol.org). |
|                                        |                               |
<!-- markdownlint-enable -->

## Development platform

We use [Platform.sh](https://platform.sh) to develop our demonstration
application (and hence HASHTAG). From their site: "Platform.sh is a polyglot,
multicloud PaaS, with continuous deployment built in." For us that means
efficient and stable remote collaboration workflows.

Like competing PaaS's, Platform is a robust service with many bells and
whistles including excellent documentation, Github integration and a CLI.
There is a learning curve to using Platform and where appropriate, we will
provide details as to how our dApp integrates with Platform.

That being said, our goal is to ensure HASHTAG can be developed with intimate
knowledge of the internals of Platform.sh.

## Developer workflow

We use the widely-adopted "[Forking
Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow)"
for development of our dapp:

Additionally, we've integrated with Platform.sh for our hosting, which gives
us a great deal of automation when it comes to deployment and testing.

To contribute to the project, this is the typical flow:

1. Developer ("Dev") is given read and fork access to the main, upstream repo.
1. Dev [forks](https://help.github.com/articles/fork-a-repo/) the upstream
   repo so he now has a copy on GitHub he can push directly into.
1. [Dev clones his fork of the repo down to his local
   environment](https://help.github.com/articles/fork-a-repo/#step-2-create-a-local-clone-of-your-fork)
   so he can work on the codebase locally.
1. Dev [adds a new git remote to his local git repo called
   "upstream"](https://help.github.com/articles/fork-a-repo/#step-3-configure-git-to-sync-your-fork-with-the-original-spoon-knife-repository)
   that points to the official/main/upstream repository

      ```` bash
      git remote add upstream git@github.com:hashtag-protocol/hashtag-protocol.git
      ````

1. Dev creates or is assigned an issue in the project issue queue.
1. Locally, Dev ensures he's working with the latest code in [upstream
   stage](https://github.com/hashtag-protocol/hashtag-protocol) and then
   creates a new "feature" branch off of the **stage branch**. Only work
   against the master branch only in the case of Hotfixes.

      ```` bash
      git checkout stage
      git pull upstream stage
      git checkout -b [github-issue-number]-short-description-of-feature
      ````

1. Dev tags his issue "in progress" and works in his feature branch developing
   the feature.  Throughout this development dev is committing and pushing to
   his branch inside of his fork (git push origin [feature-branch-name]) so
   that he always has a copy of his latest work in the cloud.  If he needs
   anything from any branch in the official repo (say stage branch), he can
   "git pull upstream stage" and now the latest project code is right there
   for him.  If he needs something from a colleague he can add said
   colleague's github fork as a remote (eg. `git remote add swaylock
   git@github.swaylock/hashtag-protocol.git`) and pull in the desired branch
   (eg. `git pull swaylock 123-some-neat-feature`).
1. Dev is happy with his work and is ready to get eyes on it - and hopefully
   get it merged into the project.
1. Dev requests that his feature-branch in his fork on GitHub be merged/pulled
   into the upstream repo's stage (master for hotfixes) branch by [pull
   requesting his
   work](https://help.github.com/articles/using-pull-requests/).
1. Dev removes the "in progress" label from his issue and adds the "needs
   review" label so it's clear to everyone what state the issue is in.
1. On pull-request, a webhook fires and Platform.sh spins up an instance of
   the pull-requested branch for testing. If the PR environment on Platform
   successfully builds, the link to the instance appears on the pull request
   page on Github.
1. Release manager or senior dev (or both) review the feature, and the
   proposed changes to the codebase.  They utilize the Platform.sh-provided
   test environment, as well as the results of the automated testing
   ([@todo](#todos) - set this up), to ensure the functionality is there and
   that the additions/changes haven't broken anything.
1. If unhappy with anything, the reviewers comment in the pull request exactly
   what needs work/fixing/adjustment.  Line-commenting is also possible here.
1. The developer then has the chance to improve the code in that branch until
   the reviewers are happy - at which point the reviewers approve the pull
   request / merge the feature branch into the official repo's stage (or
   master for hotfixes) branch.
1. At this point a webhook fires and the updated stage or master branch is
   automatically deployed to the stage or master environment on Platform.sh.

## Commit message guidelines

We prefer a standard commit message format, and it largely parallels the
[Seven Rules of a Great Commit
Message](http://chris.beams.io/posts/git-commit/):

* Always place a reference to the GitHub issue number that caused the commit
  at the end of the commit body (not the subject line).  This holds even if
  it's the only thing in the body.
  * Why?  The issue number is a what/why type of detail, and that stuff
    belongs in the body.  Plus, with a 50-char subject line length, there's
    not much room for the issue number.
* When referencing a GitHub issue inside of a commit, use the "gh-123" format,
  not "#123".
  * Why?  The "#" character doubles as a line comment indicator in many commit
    message editors.  Additionally, if the codebase ever moves to a different
    issue tracker it will be clear which issue tracker holds the issue
    references (in this case GitHub) and we won't have inaccurate issue
    references in the new tracker.
* Save your issue-closing "Resolves gh-123" type of statement for your pull
  request body.  While your commit may seem like it resolves an issue, code
  review and testing may necessitate more commits prior to merge and issue
  resolution, rendering the statement in your commit message inaccurate.

Example:

````
Summarize changes in around 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body. The
blank line separating the summary from the body is critical (unless
you omit the body entirely); various tools like `log`, `short log`
and `rebase` can get confused if you run the two together.

Explain the problem that this commit is solving. Focus on why you
are making this change as opposed to how (the code explains that).
Are there side effects or other unintuitive consequences of this
change? Here's the place to explain them.

Further paragraphs come after blank lines.

  - Bullet points are okay, too

  - Typically a hyphen or asterisk is used for the bullet, preceded
    by a single space, with blank lines in between, but conventions
    vary here

If an issue in GitHub caused this commit, be sure to reference it:

gh-123
````

## Pull request guidelines

Please reference your issue number in your pull request body as follows:

```` bash
Relates to gh-123
````

If you it relates to more than one issue, separate issue numbers with commas.

```` bash
Relates to gh-123, gh-124
````

[@todo](#todos) - set up a proper PR template in Github

### Todos

1. Evaluate & set up Lerna
2. Integrate automated testing.
3. Set up proper issue & pull request templates in Github.
