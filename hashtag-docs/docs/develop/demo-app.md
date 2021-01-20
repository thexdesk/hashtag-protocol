# Demo application

Our demo application, located at
[https://app.hashtag-protocol.org](https://app.hashtag-protocol.org) is a
sample implementation of Hashtag Protocol meant to be a showcase and
testing ground for the various features and functions of the protocol.

## Installing locally

Create a fork of the [Hashtag Protocol
repository](https://github.com/hashtag-protocol/hashtag-protocol) by clicking
on the "fork" button on the upper right of the Github interface. Next clone
the your forked copy locally and install its dependencies. Note: you will need
[yarn](https://yarnpkg.com/lang/en/docs/install/) or
[npm](https://docs.npmjs.com/cli/install) installed.

``` powershell
git clone git@github.com:[your username or organization]/hashtag-protocol.git
cd hashtag-dapp
yarn install --lock-file
```

While within `/hashtag-dapp/`, make a file called `.env.local`

``` powershell
touch .env.local
```

Copy and save the following into that `.env.local`

``` ini
VUE_APP_HASHTAG_SUBGRAPH_URL=https://api.thegraph.com/subgraphs/name/blockrockettech/hashtag
VUE_APP_TOP_NFTS_SUBGRAPH_URL=https://api.thegraph.com/subgraphs/name/blockrockettech/nft-tokens
```

Learn more about Vue.js [environment
variables](https://cli.vuejs.org/guide/mode-and-env.html#modes-and-environment-variables).
Please see below more more details regarding application endpoints.


Startup the local development server

``` powershell
yarn serve
```

## Application endpoints

When developing the application locally, you may either use our remote
staging/testing endpoints given above or you may install each of the services
locally. If you choose the latter, make sure you modify the .env.local file to
point to your local endpoints.
