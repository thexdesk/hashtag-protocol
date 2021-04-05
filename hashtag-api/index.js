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
      return hashtag;
    })
    .then((result) => {
      // result is hashtag json object with image element added in previous step.
      // Build the token metadata structure.
      const metadata = buildMetadata(result, req);
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

  //const logo = fs.readFileSync("./assets/img/logo-white.svg");
  //const base64Image = new Buffer.from(logo).toString("base64");
  hashtag["logo"] =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjE2cHgiIGhlaWdodD0iMjA0cHgiIHZpZXdCb3g9IjAgMCAyMTYgMjA0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA2MS4yICg4OTY1MykgLSBodHRwczovL3NrZXRjaC5jb20gLS0+CiAgICA8dGl0bGU+V2hpdGU8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iV2hpdGUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJHcm91cC02IiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJSZWN0YW5nbGUiIHBvaW50cz0iNTkuMjA0ODE5OCAwIDk1LjIwNDgxOTggMCA5MS40NjI3OTI4IDM2IDU1LjQ2Mjc5MjggMzYiPjwvcG9seWxpbmU+CiAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUmVjdGFuZ2xlIiBwb2ludHM9IjE0My4yMDQ4MiAwIDE3OS4yMDQ4MiAwIDE3NS40NjI3OTMgMzYgMTM5LjQ2Mjc5MyAzNiI+PC9wb2x5bGluZT4KICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJSZWN0YW5nbGUiIHBvaW50cz0iNTQuODM5MTIxNiA0MiA5MC44MzkxMjE2IDQyIDg3LjA5NzA5NDYgNzggNTEuMDk3MDk0NiA3OCI+PC9wb2x5bGluZT4KICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJSZWN0YW5nbGUiIHBvaW50cz0iMTIuODM5MTIxNiA0MiA0OC44MzkxMjE2IDQyIDQ1LjA5NzA5NDYgNzggOS4wOTcwOTQ1OCA3OCI+PC9wb2x5bGluZT4KICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJSZWN0YW5nbGUiIHBvaW50cz0iMTM4LjgzOTEyMiA0MiAxNzQuODM5MTIyIDQyIDE3MS4wOTcwOTUgNzggMTM1LjA5NzA5NSA3OCI+PC9wb2x5bGluZT4KICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJSZWN0YW5nbGUiIHBvaW50cz0iMTgwLjgzOTEyMiA0MiAyMTYuODM5MTIyIDQyIDIxMy4wOTcwOTUgNzggMTc3LjA5NzA5NSA3OCI+PC9wb2x5bGluZT4KICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJSZWN0YW5nbGUiIHBvaW50cz0iNC4xMDc3MjUyMiAxMjYgNDAuMTA3NzI1MiAxMjYgMzYuMzY1Njk4MiAxNjIgMC4zNjU2OTgxOTMgMTYyIj48L3BvbHlsaW5lPgogICAgICAgICAgICA8cG9seWxpbmUgaWQ9IlJlY3RhbmdsZSIgcG9pbnRzPSIxNzIuMTA3NzI1IDEyNiAyMDguMTA3NzI1IDEyNiAyMDQuMzY1Njk4IDE2MiAxNjguMzY1Njk4IDE2MiI+PC9wb2x5bGluZT4KICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJSZWN0YW5nbGUiIHBvaW50cz0iNTAuNDczNDIzNCA4NCA4Ni40NzM0MjM0IDg0IDgyLjczMTM5NjQgMTIwIDQ2LjczMTM5NjQgMTIwIj48L3BvbHlsaW5lPgogICAgICAgICAgICA8cG9seWxpbmUgaWQ9IlJlY3RhbmdsZSIgcG9pbnRzPSIxMzQuNDczNDIzIDg0IDE3MC40NzM0MjMgODQgMTY2LjczMTM5NiAxMjAgMTMwLjczMTM5NiAxMjAiPjwvcG9seWxpbmU+CiAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUmVjdGFuZ2xlIiBwb2ludHM9IjQ2LjEwNzcyNTIgMTI2IDgyLjEwNzcyNTIgMTI2IDc4LjM2NTY5ODIgMTYyIDQyLjM2NTY5ODIgMTYyIj48L3BvbHlsaW5lPgogICAgICAgICAgICA8cG9seWxpbmUgaWQ9IlJlY3RhbmdsZSIgcG9pbnRzPSI5Ni44MzkxMjE2IDQyIDEzMi44MzkxMjIgNDIgMTI5LjA5NzA5NSA3OCA5My4wOTcwOTQ2IDc4Ij48L3BvbHlsaW5lPgogICAgICAgICAgICA8cG9seWxpbmUgaWQ9IlJlY3RhbmdsZSIgcG9pbnRzPSI4OC4xMDc3MjUyIDEyNiAxMjQuMTA3NzI1IDEyNiAxMjAuMzY1Njk4IDE2MiA4NC4zNjU2OTgyIDE2MiI+PC9wb2x5bGluZT4KICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJSZWN0YW5nbGUiIHBvaW50cz0iMTMwLjEwNzcyNSAxMjYgMTY2LjEwNzcyNSAxMjYgMTYyLjM2NTY5OCAxNjIgMTI2LjM2NTY5OCAxNjIiPjwvcG9seWxpbmU+CiAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUmVjdGFuZ2xlIiBwb2ludHM9IjQxLjc0MjAyNyAxNjggNzcuNzQyMDI3IDE2OCA3NCAyMDQgMzggMjA0Ij48L3BvbHlsaW5lPgogICAgICAgICAgICA8cG9seWxpbmUgaWQ9IlJlY3RhbmdsZSIgcG9pbnRzPSIxMjUuNzQyMDI3IDE2OCAxNjEuNzQyMDI3IDE2OCAxNTggMjA0IDEyMiAyMDQiPjwvcG9seWxpbmU+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";

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
    // console.log(error);
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
