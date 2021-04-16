# Demo application

Our demo application, located at
[https://app.hashtag-protocol.org](https://app.hashtag-protocol.org) is a sample
implementation of Hashtag Protocol meant to be a showcase and testing ground for
the various features and functions of the protocol.

## Installing locally

Working from the root directory of [your fork](/develop/#developer-workflow) of
the [Hashtag Protocol
repository](https://github.com/hashtag-protocol/hashtag-protocol) navigate into
`/hashtag-dapp/` and install the dapp dependencies.

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

::: tip When developing the application locally, you may either use our remote
staging/testing endpoints given above or you may install each of the services
locally. If you choose the latter, make sure you modify the .env.local file to
point to your local endpoints.

Learn more about Vue.js [environment
variables](https://cli.vuejs.org/guide/mode-and-env.html#modes-and-environment-variables).
:::

## Local development

For developing the entire tech stack locally, there's a great article that will
get you quite far here:

<https://medium.com/blockrocket/dapp-development-with-a-local-subgraph-ganache-setup-566a4d4cbb>

There's a few gotchas and items missing items in that article, so here's a
summary below of the steps. One thing I found useful, is to have 5 different
terminal tabs open for each of the steps below. I'll indicate where to open a
new terminal tab. 

1. Open a new terminal tab and install Truffle and Ganache globally:

``` bash
# NPM
$ npm install -g truffle ganache-cli

# Yarn
$ yarn global add truffle ganache-cli
```

2. In the same tab, start a local blockchain using ganache-cli

``` zsh
ganache-cli -h 0.0.0.0 -m "worth grunt bridge trade chuckle stand lamp jealous snow order pluck mobile" -i 5777 --chainId 5777
```

3. Open another tab (tab #2). Navigate to the hashtag-contracts directory and
   compile and migrate the solidity contracts to the local blockchain we just
   started.

``` bash
cd hashtag-contracts
truffle compile
truffle migrate --network development
```

4. Add network & contract information to /src/truffleconf files. These will get
   picked up when we start the dapp.

``` bash
# get the contract information
truffle networks

# you should see a print out as follows:
Network: UNKNOWN (id: 5777)
  ERC721HashtagRegistry: 0xa0510213237582f08E4AD636F56894900a65dC48
  HashtagAccessControls: 0x4b9B7CAD4e6B0F96E47D33305D369344439d9e2D
  HashtagProtocol: 0xeE9168c1C4DCf88F69ac11901A37D14369261692
  Migrations: 0x54e27a63a8B5a2a04E8cC2DF1EBE0Cd59F459601
```

In your editor, open `/src/truffleconf/HashtagProtocol.json` and
`/src/truffleconf/ERC721HashtagRegistry.json`. In each file, scroll down to the
"networks" section and edit them so they look like this:

``` json
// HashtagProtocol.json
"networks": {
  "1": {
    "address": "0x3a7a449308052d74256Bb6867979AbA51b2cD887"
  },
  "4": {
    "address": "0xA948549116e716CC0Da11AFdbCabf01ff04Fc35e"
  },
  "5777": {
    "address": "0x38238AC79c0DA146cadd64acb5597517961817a7"
  }
},

// ERC721HashtagRegistry.json
"networks": {
  "1": {
    "address": "0x4f1f007F2db30fb61fDad2598417B8019f311A37"
  },
  "4": {
    "address": "0x2a23A463C7d676f3C94402eA0B0450E36BF14305"
  },
  "5777": {
    "address": "0x5c467525c449C54cE1880CA368814c2dbff87836"
  }
},
```

5. Open another tab (tab #3). You need docker running on your machine; if you
   don't have it, install it now. Once installed, do the following:

``` bash
# navigate into the hashtag-subgraph graph-node directory.
cd hashtag-subgraph/graph-node

# Start the subgraph image.
./run-graph-node.sh
```

6. Open another tab (tab #4). Deploy our subgraph code to it.

``` bash
# Perform the following commands.
yarn remove-local
yarn create-local
yarn build && yarn deploy-local

# If everything went well you should see the following:
Build completed: QmQxCQMzRMesnRhY2cFvPoUuekUpHVYevmKC4EVgvUvukE

Deployed to http://localhost:8000/subgraphs/name/hashtag-protocol/hashtag-local/graphql

Subgraph endpoints:
Queries (HTTP):     http://localhost:8000/subgraphs/name/hashtag-protocol/hashtag-local
Subscriptions (WS): http://localhost:8001/subgraphs/name/hashtag-protocol/hashtag-local
```

7. Copy the queries endpoint
   `http://localhost:8000/subgraphs/name/hashtag-protocol/hashtag-local` and
   paste it into the `/hashtag-dapp/.env.local` local environment variables
   file. In fact, your .env.local file should look something like this:

``` bash
VUE_APP_HASHTAG_SUBGRAPH_URL=<http://localhost:8000/subgraphs/name/hashtag-protocol/hashtag-local>
VUE_APP_TOP_NFTS_SUBGRAPH_URL=<https://api.thegraph.com/subgraphs/name/blockrockettech/nft-tokens>
VUE_APP_BLOCKNATIVE_API_KEY=371f97ec-05be-429d-b0a6-de74aa69c61c
VUE_APP_ONBOARD_NETWORK_ID=5777
VUE_APP_PUBLISHER_ADDRESS=0xfc5b19737950da71573EC38e7B4579608cdE4E65
VUE_APP_ONBOARD_LOCALSTORAGE_WALLET_KEY=HashtagSelectedWallet
```

