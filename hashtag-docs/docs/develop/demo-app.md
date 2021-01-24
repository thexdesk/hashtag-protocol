# Demo application

Our demo application, located at
[https://app.hashtag-protocol.org](https://app.hashtag-protocol.org) is a
sample implementation of Hashtag Protocol meant to be a showcase and
testing ground for the various features and functions of the protocol.

## Installing locally

Working from the root directory of [your fork](/develop/#developer-workflow)
of the [Hashtag Protocol
repository](https://github.com/hashtag-protocol/hashtag-protocol) navigate
into the `/hashtag-dapp/` and install

``` sh
cd hashtag-dapp
yarn install --lock-file
```

While within `/hashtag-dapp/`, make a file called `.env.local`

``` sh
touch .env.local
```

Copy and save the following into that `.env.local`

``` ini
VUE_APP_HASHTAG_SUBGRAPH_URL=https://api.thegraph.com/subgraphs/name/blockrockettech/hashtag
VUE_APP_TOP_NFTS_SUBGRAPH_URL=https://api.thegraph.com/subgraphs/name/blockrockettech/nft-tokens
```

Startup the local development server

``` sh
yarn serve
```

([@todo](#todos) - find and remove remaining hard-coded keys, addresses, etc)

::: tip
When developing the application locally, you may either use our remote
staging/testing endpoints given above or you may install each of the services
locally. If you choose the latter, make sure you modify the .env.local file to
point to your local endpoints.

Learn more about Vue.js [environment
variables](https://cli.vuejs.org/guide/mode-and-env.html#modes-and-environment-variables).
:::


### Todos

1. Find and remove remaining hard-coded keys, addresses, etc in codebase
