const axios = require("axios");
const express = require("express");
const path = require("path");
const moment = require("moment");
const config = require("platformsh-config").config();
const nodeHtmlToImage = require("node-html-to-image");

let PORT;
if (!config.isValidPlatform()) {
  PORT = 5000;
} else {
  PORT = config.port;
}

const app = express().set("port", PORT);

// Static public files
app.use(express.static(path.join(__dirname, "public")));

app.get("/:token_id", async function (req, res) {
  // Parse the token id from the URL.
  const tokenId = parseInt(req.params.token_id).toString();
  if (!tokenId) {
    return;
  }

  await axios({
    url:
      "https://api.thegraph.com/subgraphs/name/hashtag-protocol/hashtag-mainnet",
    method: "post",
    data: {
      query: `{
      hashtag(id: ${tokenId} ) {
        id,
        displayHashtag,
        hashtagWithoutHash,
        creator,
        publisher,
        timestamp
      }
     }`,
    },
  })
    .then((result) => {
      // console.log("axios result", result.data.data.hashtag);
      // Get the data returned from The Graph.
      let hashtag = result.data.data.hashtag;
      // Stitch in nicely formatted token creation date.
      hashtag.date = moment.unix(hashtag.timestamp).format("MMM Do YYYY");
      // Build the token image, and add it to the hashtag object.
      hashtag = buildImage(hashtag);
      // Return the hashtag, to be picked up in next "then".
      console.log("build image", hashtag);
      return hashtag;
    })
    .then((result) => {
      // result is hashtag json object with image element added in previous step.
      // Build the token metadata structure.
      const metadata = buildMetadata(result, req);
      console.log("build metadata", hashtag);
      // send to the screen.
      res.send(metadata);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

async function buildImage(hashtag) {
  // Use es6-template-strings to parse hashtag data
  // into a template, and return as a string
  // to pass to the nodeHtmlToImage processor.
  const fs = require("fs");
  const compile = require("es6-template-strings/compile"),
    resolveToString = require("es6-template-strings/resolve-to-string");
  const data = fs.readFileSync("./assets/templates/series2021.txt", "utf8");
  const compiled = compile(data);
  const content = resolveToString(compiled, hashtag);

  try {
    await nodeHtmlToImage({
      html: content,
      output: `./public/images/${hashtag.id}.png`,
      puppeteerArgs: {
        // Pass in puppeteer custom options to fix image resolution.
        // @see
        // https://github.com/puppeteer/puppeteer/blob/8370ec88ae94fa59d9e9dc0c154e48527d48c9fe/docs/api.md#puppeteerlaunchoptions
        // https://github.com/puppeteer/puppeteer/issues/571
        defaultViewport: { deviceScaleFactor: 2, width: 1200, height: 1200 },
      },
    });
  } catch (error) {
    console.log(error);
    return false;
  }

  hashtag["image"] = `images/${hashtag.id}.png`;
  return hashtag;
}

function buildMetadata(hashtag, req) {
  const fullUrl = req.protocol + "://" + req.get("host");
  const metadata = {
    name: hashtag.displayHashtag,
    external_url: `https://app.hashtag-protocol.org/hashtag/${hashtag.hashtagWithoutHash}`,
    image: `${fullUrl}/${hashtag.image}`,
  };

  return metadata;
}

// Get PORT and start the server
app.listen(app.get("port"), function () {
  console.log(`Listening on port ${PORT}`);
});
