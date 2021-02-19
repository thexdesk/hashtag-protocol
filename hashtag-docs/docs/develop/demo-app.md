# Demo application

Our demo application, located at
[https://app.hashtag-protocol.org](https://app.hashtag-protocol.org) is a
sample implementation of Hashtag Protocol meant to be a showcase and
testing ground for the various features and functions of the protocol.

## Installing locally

Working from the root directory of [your fork](/develop/#developer-workflow)
of the [Hashtag Protocol
repository](https://github.com/hashtag-protocol/hashtag-protocol) navigate
into `/hashtag-dapp/` and install the dapp dependencies.

``` sh
cd hashtag-dapp
yarn install --lock-file
```

### Environment variables configuration

Our dApp is set up to use .env variables for it's configuration. See
[.env.example](https://github.com/hashtag-protocol/hashtag-protocol/blob/stage/hashtag-dapp/.env.example)
more information about what the environment variables are used for.

While still within `/hashtag-dapp/`, make a file called `.env.local`

``` sh
touch .env.local
```

Copy and save the following into that `.env.local`

``` ini
VUE_APP_HASHTAG_SUBGRAPH_URL=https://api.thegraph.com/subgraphs/name/blockrockettech/hashtag
VUE_APP_TOP_NFTS_SUBGRAPH_URL=https://api.thegraph.com/subgraphs/name/blockrockettech/nft-tokens
VUE_APP_PUBLISHER_ADDRESS=0xd677aed0965ac9b54e709f01a99ceca205aebc4b
VUE_APP_BLOCKNATIVE_API_KEY=371f97ec-05be-429d-b0a6-de74aa69c61c
VUE_APP_ONBOARD_NETWORK_ID=4
```

### Development server

Startup the local development server

``` sh
yarn serve
```

::: tip
When developing the application locally, you may either use our remote
staging/testing endpoints given above or you may install each of the services
locally. If you choose the latter, make sure you modify the .env.local file to
point to your local endpoints.

Learn more about Vue.js [environment
variables](https://cli.vuejs.org/guide/mode-and-env.html#modes-and-environment-variables).
:::
