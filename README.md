# hashtag-dApp

## Installation

To run the Hashtag dApp locally, create a fork of this repository by clicking on the "fork" button on the upper right of the GitHub interface. Next clone the your forked copy locally and install its dependencies. You will need [yarn](https://yarnpkg.com/lang/en/docs/install/) or [npm]()https://docs.npmjs.com/cli/install installed.

```
git clone git@github.com:[your username or organization]/hashtag-protocol.git
cd hashtag-dapp
yarn install --lock-file # or `npm install`
```

### Running the Frontend

```
npm run serve
```

### Using

When running the application, it will be based at `localhost:8080`, go to `/hashtags` to view the main Hashtag View page.

This project is currently using Vue and Vuex, with Semantic UI.
