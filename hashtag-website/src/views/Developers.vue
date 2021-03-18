<template>
  <div class="body">
    <div class="content-wrapper">
      <section class="section nav">
        <div class="container">
          <Navbar></Navbar>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-5">
              <h1 class="is-size-1 title is-spaced">
                Provide your users rich, decentralized content tagging stored to
                a global, immutable database.
              </h1>
              <div class="is-size-5 is-spaced">
                <strong>Demo</strong>&nbsp;
                <a :href="this.app" type="is-primary"> Hashtag dApp </a>
                <br />
                <strong>Technical</strong>&nbsp; <a :href="this.docs">Docs</a>,
                <a :href="designNotes" download="hashtag-protocol.pdf"
                  >Design notes</a
                >,
                <a href="/build">Github repo</a>
                <br />
                <strong>Connect</strong>&nbsp;
                <a href="mailto:contact@hashtag-protocol.org">Email us</a>,
                <a href="/build">Discord</a>,
                <a href="https://hashtagprotocol.substack.com">Substack</a>
              </div>
            </div>
            <div class="column is-7">
              <span class="image">
                <img :src="require(`../assets/img/wordcloud.png`)" />
              </span>
            </div>
          </div>
        </div>
      </section>
      <section class="section is-medium has-background-dark">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-5">
              <h2 class="title is-size-3 is-spaced has-text-white-ter">
                Create HASHTAG Tokens
              </h2>
              <div class="content is-medium has-text-white-ter">
                <p>
                  Hashtag Tokens (HASHTAG) are digital representations of
                  hashtag text strings stored as non-fungible tokens (NFTs) on
                  the Ethereum blockchain.
                </p>
                <p>
                  As a whitelisted publisher, you can generate revenue from
                  HASHTAG minted in your application.
                </p>
                <p>
                  <a
                    href="https://docs.hashtag-protocol.org/essentials/#hashtag-token-hashtag"
                    >Learn about HASHTAG cryptoeconomics</a
                  >
                  <span class="icon has-text-primary">
                    <i class="mdi mdi-arrow-right mdi-18px"></i>
                  </span>
                </p>
              </div>
            </div>
            <div class="column is-offset-1 is-6">
              <div class="is-size-7 create-tokens line-numbers">
                <b-tabs type="is-boxed" :animated="false">
                  <b-tab-item label="mint()">
                    <prism language="solidity">
                      {{ mint }}
                    </prism>
                  </b-tab-item>
                  <b-tab-item label="mintAndTag()">
                    <prism language="solidity">
                      {{ mintAndTag }}
                    </prism>
                  </b-tab-item>
                </b-tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section is-medium has-background-white">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-6">
              <div class="content">
                <template>
                  <b-carousel
                    :autoplay="false"
                    :indicator-inside="false"
                    animated="fade"
                    indicator-style="is-boxes"
                  >
                    <b-carousel-item
                      v-for="(schema, i) in taggingSchema"
                      :key="i"
                    >
                      <span class="image">
                        <img
                          :src="require(`../assets/img/${schema.img}.png`)"
                        />
                      </span>
                    </b-carousel-item>
                  </b-carousel>
                </template>
              </div>
            </div>
            <div class="column is-4 is-offset-1">
              <h2 class="title is-size-3 is-spaced">
                Tag content with HASHTAG
              </h2>
              <div class="content is-medium">
                <p>
                  Generate revenue when users tag content in your application.
                </p>
                <p>
                  Our first tagging contract supports on-chain tagging of other
                  ERC-721 non-fungible tokens.
                </p>
                <p>
                  <a
                    href="https://docs.hashtag-protocol.org/essentials/#tagging-digital-content"
                    alt="on-chain tagging cryptoeconomics"
                    >Learn about on-chain tagging</a
                  >
                  <span class="icon has-text-primary">
                    <i class="mdi mdi-arrow-right mdi-18px"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section is-medium has-background-dark subgraph">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-5">
              <h2 class="title is-size-3 is-spaced has-text-white-ter">
                Surface and display tagging data in new and meaningful ways.
              </h2>
              <div class="content is-medium has-text-white-ter">
                <p>
                  Minting and tagging events from all publishers are captured by
                  the
                  <a
                    href="https://thegraph.com/explorer/subgraph/hashtag-protocol/hashtag-rinkby"
                    >Hashtag Protocol subgraph</a
                  >.
                </p>
                <p>
                  Rapidly query Protocol transaction data and present in your
                  own way.
                </p>
              </div>
            </div>
            <div class="column is-6 is-offset-1">
              <div class="is-size-7 create-tokens line-numbers">
                <b-tabs type="is-boxed" :animated="false">
                  <b-tab-item label="Query">
                    <prism language="javascript">
                      {{ query }}
                    </prism>
                  </b-tab-item>
                  <b-tab-item label="Result">
                    <prism language="javascript">
                      {{ queryReturn }}
                    </prism>
                  </b-tab-item>
                  <b-tab-item label="Display" class="nftDisplay">
                    <b-table :data="tags || []" focusable>
                      <template slot-scope="props">
                        <b-table-column field="nftId" label="" width="75">
                          <img :src="props.row.nftImage" />
                        </b-table-column>
                        <b-table-column field="nftName" label="Asset Name">
                          <nft-link
                            type="nft"
                            :name="props.row.nftName"
                            :contract="props.row.nftContract"
                            :id="props.row.nftId"
                          ></nft-link>
                        </b-table-column>
                        <b-table-column
                          field="projectName"
                          label="Project"
                          :visible="$screen.widescreen"
                        >
                          {{ props.row.nftContractName }}
                        </b-table-column>
                        <b-table-column field="hashtagName" label="Hashtag">
                          <hashtag :value="props.row.hashtagName"></hashtag>
                        </b-table-column>
                      </template>
                    </b-table>
                  </b-tab-item>
                </b-tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section is-medium has-background-white">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-5">
              <h2 class="title is-size-3 is-spaced">
                Generate revenue from Hashtag’s permissionless, decentralized
                tagging protocol.
              </h2>
              <div class="content is-size-5">
                <p>
                  While our mission is to serve application developers, stitched
                  into Hashtag Protocol are game-theory incentive mechanisms
                  that harness the self-interest of at least six key market
                  participants to drive positive network growth.
                </p>
                <p>
                  <a
                    href="https://docs.hashtag-protocol.org/essentials/participants.html"
                  >
                    View key participants</a
                  >
                  <span class="icon has-text-primary">
                    <i class="mdi mdi-arrow-right mdi-18px"></i>
                  </span>
                </p>
              </div>
            </div>
            <div class="column is-5 is-offset-1">
              <span class="image">
                <img :src="require(`../assets/img/participants.png`)" />
              </span>
            </div>
          </div>
        </div>
      </section>
      <section class="section is-medium has-background-dark">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-4"></div>
            <div class="column is-4">
              <h2 class="title is-spaced has-text-white-ter">
                Build with us.<br />
              </h2>
              <div class="content is-medium has-text-white-ter">
                <p>
                  Help create a future where hashtags are mediated by a
                  decentralized crypto-economic network rather than a few
                  central authorities.
                </p>
                <div class="buttons">
                  <b-button
                    size="is-medium"
                    tag="a"
                    href="https://docs.hashtag-protocol.org"
                    type="is-primary"
                    outlined
                  >
                    View docs
                  </b-button>
                  <b-button
                    size="is-medium"
                    tag="a"
                    href="/build"
                    type="is-primary"
                    outlined
                  >
                    Whitelist my application
                  </b-button>
                </div>
              </div>
            </div>
            <div class="column is-offset-1 is-1"></div>
          </div>
        </div>
      </section>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Hashtag from "../components/Hashtag";
import Navbar from "../components/Navbar";
import NftLink from "../components/NftLink";
// import RevenueModel from "../components/RevenueModel";

import { SNAPSHOT } from "@/queries";

export default {
  name: "Developers",
  components: {
    Footer,
    Hashtag,
    Navbar,
    NftLink,
    // RevenueModel,
  },
  data() {
    // prettier-ignore
    return {
      query: `// Fetch recently tagged NFTs
query {
  tags(first: 5, orderBy: timestamp, orderDirection: desc) {
    id
    hashtagId
    hashtagName
    nftContract
    nftContractName
    nftImage
    nftName
    nftId
    tagger
    timestamp
    publisher
  }
}`,
      queryReturn: `// json returned from graph query
{
  "data": {
    "tags": [
      {
        "hashtagId": "5",
        "hashtagName": "bob",
        "id": "0x749819150d62630594d3b600699fdabb87c47c0997ace7e8da00c91f54e4ad59",
        "nftContract": "0x2df6816286c583a7ef8637cd4b7cc1cc62f6161e",
        "nftContractName": "KnownOriginDigitalAsset",
        "nftId": "50401",
        "nftImage": "https://ipfs.infura.io/ipfs/QmUhQxQPi1XbzRzJ8T9PDCWZugsoG29ytEkq7bpWbuWcUC",
        "nftName": "Bonsai code",
        "publisher": "0xd677aed0965ac9b54e709f01a99ceca205aebc4b",
        "tagger": "0xd677aed0965ac9b54e709f01a99ceca205aebc4b",
        "timestamp": "1599750144"
      },
      {
        "hashtagId": "11",
        "hashtagName": "jenkins",
        "id": "0x4720dcac73ae6adcc0280206413f5665d362c9e908385b69fa223ac0bcd8e9f0",
        "nftContract": "0x2df6816286c583a7ef8637cd4b7cc1cc62f6161e",
        "nftContractName": "KnownOriginDigitalAsset",
        "nftId": "41101",
        "nftImage": "https://ipfs.infura.io/ipfs/QmSas9z2iudgDFfZc5fJzpzMYEbv5hy6LyroYQCGLtT9GW",
        "nftName": "Dreaming Big Color Dreams",
        "publisher": "0xd677aed0965ac9b54e709f01a99ceca205aebc4b",
        "tagger": "0xd677aed0965ac9b54e709f01a99ceca205aebc4b",
        "timestamp": "1599749949"
      },
      {
        "hashtagId": "10",
        "hashtagName": "mountains",
        "id": "0x7a13da22d607297d7ef1cc05bce61a44ce7710591af0e5247129f83ae0af1d2c",
        "nftContract": "0x2df6816286c583a7ef8637cd4b7cc1cc62f6161e",
        "nftContractName": "KnownOriginDigitalAsset",
        "nftId": "51201",
        "nftImage": "https://ipfs.infura.io/ipfs/QmY4XQ2qvrRwEZWr918BCjbW35Q7WJ7rsYZsDB1f8fhk7K",
        "nftName": "webp",
        "publisher": "0xd677aed0965ac9b54e709f01a99ceca205aebc4b",
        "tagger": "0x07bd3b64f9f51fe1d5c79f81dfc0460fff305b0e",
        "timestamp": "1596246628"
      },
      {
        "hashtagId": "9",
        "hashtagName": "blue",
        "id": "0x7e1c2541271d253f00beeaf2f8c73b67fdf3b4d21e4a8cb8a188ef3f6aae1d6c",
        "nftContract": "0x2df6816286c583a7ef8637cd4b7cc1cc62f6161e",
        "nftContractName": "KnownOriginDigitalAsset",
        "nftId": "41101",
        "nftImage": "https://ipfs.infura.io/ipfs/QmSas9z2iudgDFfZc5fJzpzMYEbv5hy6LyroYQCGLtT9GW",
        "nftName": "Dreaming Big Color Dreams",
        "publisher": "0xd677aed0965ac9b54e709f01a99ceca205aebc4b",
        "tagger": "0xd677aed0965ac9b54e709f01a99ceca205aebc4b",
        "timestamp": "1596124648"
      },
      {
        "hashtagId": "8",
        "hashtagName": "noeyes",
        "id": "0x81eda4e8a6d7bf435e62fc32ad7607e20c09bebd1ab33926687c44d831d58698",
        "nftContract": "0x2df6816286c583a7ef8637cd4b7cc1cc62f6161e",
        "nftContractName": "KnownOriginDigitalAsset",
        "nftId": "50401",
        "nftImage": "https://ipfs.infura.io/ipfs/QmUhQxQPi1XbzRzJ8T9PDCWZugsoG29ytEkq7bpWbuWcUC",
        "nftName": "Bonsai code",
        "publisher": "0xd677aed0965ac9b54e709f01a99ceca205aebc4b",
        "tagger": "0xd677aed0965ac9b54e709f01a99ceca205aebc4b",
        "timestamp": "1596124528"
      }
    ]
  }
}`,
      mintAndTag: `
  /**
   * @notice Combines the action of creating a new hashtag and then tagging an NFT asset with this new tag.
   * @dev Only a whitelisted publisher can execute this with the required fee unless the caller / sender has admin privileges.
   * @param _hashtag string value of the hashtag to be minted
   * @param _nftContract address of nft contract
   * @param _nftId ID of the nft to link from the above nft contract
   * @param _publisher the publisher attributed to the tagging
   * @param _tagger the ethereum account that made the original tagging request
   */
  function mintAndTag(
    string calldata _hashtag,
    address _nftContract,
    uint256 _nftId,
    address payable _publisher,
    address _tagger) payable external {
      uint256 mintAndTagFee = calculateMintAndTagFee();
      require(msg.value >= mintAndTagFee, "Mint and tag: You must send the fee");
      require(accessControls.isPublisher(_publisher), "Mint and tag: The publisher must be whitelisted");

      uint256 hashtagId = hashtagProtocol.mint{value: hashtagProtocol.fee()}(_hashtag, _publisher, _tagger);
      tag(hashtagId, _nftContract, _nftId, _publisher, _tagger);
  }`,
      mint: `
  /**
   * @notice Method that a publisher can call to create a hashtag
   * @dev A fee is required unless the caller has an admin role
   * @param _hashtag String version of the hashtag to mint
   * @param _publisher Address of the publisher through which the hashtag is being created
   * @param _recipient Address that will receive the hashtag
   * @return _tokenId ID of the new hashtag
   */
  function mint(
    string memory _hashtag, 
    address payable _publisher, 
    address _recipient) payable public returns (uint256 _tokenId) {
      require(
        accessControls.isPublisher(_publisher),
        "Mint: The publisher must be whitelisted"
      );
      require(
        accessControls.isAdmin(_msgSender()) || msg.value >= fee,
        "Mint: Must send the platform fee"
      );

      _assertHashtagIsValid(_hashtag);

      // generate the new hashtag token id
      tokenPointer = tokenPointer.add(1);
      uint256 tokenId = tokenPointer;

      // create the hashtag
      string memory hashtagKey = _lower(_hashtag);
      tokenIdToHashtag[tokenId] = Hashtag({
          value : hashtagKey,
          displayVersion : _hashtag,
          created : now,
          originalPublisher : _publisher,
          creator : _msgSender()
          });

      // store a reverse lookup and mint the tag
      hashtagToTokenId[hashtagKey] = tokenId;
      displayHashtagToTokenId[_hashtag] = tokenId;

      _mint(_recipient, tokenId);

      // As long as the sender is not admin, a fee is required to mint
      uint256 platformFee;
      uint256 publisherFee;
      if (msg.value > 0) {
          // split fee
          platformFee = fee.div(modulo).mul(platformPercentage);
          (bool platformSuccess,) = platform.call{value : platformFee}("");
          require(platformSuccess, "Failed to transfer commission to platform");

          publisherFee = msg.value.sub(platformFee);
          (bool publisherSuccess,) = _publisher.call{value : publisherFee}("");
          require(publisherSuccess, "Failed to transfer commission to publisher");
      }

      // send the user any change / unexpected funds back
      _refundRemainingBalance();

      // log the minting event
      emit MintHashtag(tokenId, _recipient, hashtagKey, _hashtag, _publisher, platformFee, publisherFee);

      return tokenId;
  }
      `,
      taggingContracts: [
        {
          img: "tagging-contracts-today",
        },
        {
          img: "tagging-contracts-roadmap",
        },
      ],
      taggingSchema: [
        {
          img: "tagging-contracts-roadmap",
        },
        {
          img: "tagging-schema-one-one",
        },
        {
          img: "tagging-schema-one-many",
        },
        {
          img: "tagging-schema-many-one",
        },
        {
          img: "tagging-schema-many-many",
        },
      ],
    };
  },
  apollo: {
    tags: {
      query: SNAPSHOT,
      pollInterval: 1000, // ms
    },
  },
};
</script>

<style lang="scss">
code {
  .token.number {
    color: $dark;
    height: auto;
  }

  .number {
    background: none;
    font-size: inherit;
    padding: 0;
    margin: 0;
    min-width: inherit;
  }
}

.create-tokens {
  .tabs {
    li {
      a {
        font-weight: bold;
      }
    }

    li:not(.is-active) {
      a {
        color: $white;
      }

      a:hover {
        background: none;
      }
    }
  }

  .tab-content {
    padding: 0;

    pre {
      height: 400px;
      overflow-y: scroll;
      margin: 0;
    }
  }
}

.subgraph {
  .nftDisplay {
    img {
      max-width: 75px;
      max-height: 75px;
    }
  }
}
</style>
