const axios = require("axios");
const express = require("express");
const path = require("path");
const moment = require("moment");
const config = require("platformsh-config").config();
//const nodeHtmlToImage = require("node-html-to-image");

let PORT;
if (!config.isValidPlatform()) {
  PORT = 5000;
} else {
  PORT = config.port;
}

const app = express().set("port", PORT);
app.use(express.static(path.join(__dirname, "public")));
// Disable favicon.
app.get("/favicon.ico", (req, res) => res.status(204));

app.get("/:token_id", async function (req, res) {
  // Parse the token id from the URL.
  const tokenId = parseInt(req.params.token_id).toString();
  if (!tokenId) {
    return;
  }

  buildMetadata(tokenId, req)
    .then((metadata) => {
      console.log("build metadata", metadata);
      res.send(metadata);
    })
    .catch((e) => console.log(e));
});

async function buildMetadata(tokenId, req) {
  if (!tokenId) {
    return;
  }
  console.log("tokenId", tokenId);
  let response = await axios({
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
  });

  //console.log("axios response", response);
  if (response.statusText != "OK") {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  let hashtag = response.data.data.hashtag;
  console.log("axios data", response.data.data.hashtag);

  // Stitch in nicely formatted token creation date.
  hashtag.date = moment.unix(hashtag.timestamp).format("MMM Do YYYY");
  hashtag.image = await buildImage(hashtag);

  const fullUrl = req.protocol + "://" + req.get("host");

  const metadata = {
    name: hashtag.displayHashtag,
    external_url: `https://app.hashtag-protocol.org/hashtag/${hashtag.hashtagWithoutHash}`,
    image: `${fullUrl}/${hashtag.image}`,
  };

  return metadata;
}

async function buildImage(hashtag) {
  try {
    // Use es6-template-strings to parse hashtag data
    // into a template, and return as a string
    // to pass to the nodeHtmlToImage processor.
    const fs = require("fs");
    const compile = require("es6-template-strings/compile"),
      resolveToString = require("es6-template-strings/resolve-to-string");
    const data = fs.readFileSync("./assets/templates/series2021.txt", "utf8");
    const compiled = compile(data);

    const html = resolveToString(compiled, hashtag);
    const path = `./public/images/${hashtag.id}.png`;
    const puppeteer = require("puppeteer");

    let browser;
    // Connect to chrome-headless using pre-formatted puppeteer credentials
    if (config.isValidPlatform()) {
      const formattedURL = config.formattedCredentials(
        "chromeheadlessbrowser",
        "puppeteer"
      );
      browser = await puppeteer.connect({ browserURL: formattedURL });
    } else {
      browser = await puppeteer.launch({ headless: true });
    }

    let page = await browser.newPage();
    const loaded = page.waitForNavigation({
      waitUntil: "load",
    });
    await page.setContent(html, {
      waitUntil: ["domcontentloaded", "networkidle2"],
    });
    await loaded;
    await page.setViewport({ width: 600, height: 600, deviceScaleFactor: 2 });
    await page.screenshot({
      path: path,
      type: "png",
      fullPage: true,
    });
    await page.close();
    await browser.close();

    return `images/${hashtag.id}.png`;
  } catch (e) {
    return Promise.reject(e);
  }
}

// Get PORT and start the server
app.listen(app.get("port"), function () {
  console.log(`Listening on port ${PORT}`);
});
