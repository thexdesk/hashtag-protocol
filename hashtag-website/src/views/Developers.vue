<template>
  <div class="body">
    <div class="content-wrapper">
      <section class="section nav">
        <div class="container">
          <Navbar></Navbar>
        </div>
      </section>
      <section class="section" id="overview">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-5">
              <h1 class="is-size-1 title is-spaced">
                Provide users rich, decentralized content tagging stored to a
                global, immutable database.
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
          <b-button
            outlined
            class="is-pulled-right is-hidden-touch"
            type="is-primary"
            icon-right="arrow-down"
            onClick="document.getElementById('create').scrollIntoView({block: 'start', behavior: 'smooth'});"
          />
        </div>
      </section>
      <section class="section is-medium has-background-dark" id="create">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-5">
              <h2 class="title is-size-3 is-spaced has-text-white-ter">
                Create HASHTAG tokens
              </h2>
              <div class="content is-medium has-text-white-ter">
                <p>
                  Hashtag Tokens (HASHTAG) are digital representations of
                  hashtag text strings stored as non-fungible tokens (NFTs) on
                  the Ethereum blockchain.
                </p>
                <p>
                  As a whitelisted publisher, you can generate revenue from
                  HASHTAG tokens minted in your application.
                </p>
                <p>
                  <a
                    href="https://docs.hashtag-protocol.org/essentials/#hashtag-token-hashtag"
                    >Learn about HASHTAG token cryptoeconomics</a
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
          <b-button
            outlined
            inverted
            class="is-pulled-right is-hidden-touch"
            icon-right="arrow-down"
            type="is-primary"
            onClick="document.getElementById('tagging').scrollIntoView({block: 'start', behavior: 'smooth'});"
          />
        </div>
      </section>
      <section class="section is-medium has-background-white" id="tagging">
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
                Tag content with HASHTAG tokens
              </h2>
              <div class="content is-medium">
                <p>
                  Generate revenue for yourself, token creators & owners when
                  users tag content in your application.
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
          <b-button
            outlined
            class="is-pulled-right is-hidden-touch"
            icon-right="arrow-down"
            type="is-primary"
            onClick="document.getElementById('subgraph').scrollIntoView({block: 'start', behavior: 'smooth'});"
          />
        </div>
      </section>
      <section
        class="section is-medium has-background-dark subgraph"
        id="subgraph"
      >
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
                    target="_blank"
                    href="https://thegraph.com/explorer/subgraph/hashtag-protocol/hashtag-mainnet"
                    >Hashtag Protocol subgraph</a
                  >.
                </p>
                <p>
                  Rapidly query Hashtag Protocol transaction data and present it
                  in your own way.
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
                        <b-table-column field="nftId" centered>
                          <router-link
                            :to="{
                              name: 'nft-detail',
                              params: {
                                type: 'nft',
                                contract: props.row.nftContract,
                                id: props.row.nftId,
                              },
                            }"
                          >
                            <img
                              :src="props.row.nftImage"
                              :alt="props.row.nftName"
                              class="nft-thumb"
                            />
                          </router-link>
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
                          <hashtag
                            :value="props.row.hashtagDisplayHashtag"
                          ></hashtag>
                        </b-table-column>
                      </template>
                    </b-table>
                  </b-tab-item>
                </b-tabs>
              </div>
            </div>
          </div>
          <b-button
            outlined
            inverted
            class="is-pulled-right is-hidden-touch"
            icon-right="arrow-down"
            type="is-primary"
            onClick="document.getElementById('revenue').scrollIntoView({block: 'start', behavior: 'smooth'});"
          />
        </div>
      </section>
      <section class="section is-medium has-background-white" id="revenue">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-5">
              <h2 class="title is-size-3 is-spaced">
                Generate revenue from Hashtag Protocol's permissionless,
                decentralized tagging protocol.
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
              <span class="image participants">
                <img :src="require(`../assets/img/participants.png`)" />
              </span>
            </div>
          </div>
          <b-button
            outlined
            class="is-pulled-right is-hidden-touch"
            icon-right="arrow-down"
            type="is-primary"
            onClick="document.getElementById('build').scrollIntoView({block: 'start', behavior: 'smooth'});"
          />
        </div>
      </section>
      <section class="section is-medium has-background-dark" id="build">
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
          <b-button
            outlined
            class="is-pulled-right is-hidden-touch"
            icon-right="arrow-up"
            type="is-primary"
            onClick="window.scrollTo({top: 0, behavior: 'smooth'});"
          />
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
    hashtagDisplayHashtag
    hashtag
    hashtagWithoutHash
    nftContract
    nftId
    nftContractName
    nftTokenUri
    nftName
    nftDescription
    nftImage
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
        "hashtag": "#tesla",
        "hashtagDisplayHashtag": "#Tesla",
        "hashtagId": "4",
        "hashtagWithoutHash": "tesla",
        "id": "0x5cd73ce1328dc497ada2d29eb5beccefd46fb589e3e60e80e1658444732a7020",
        "nftContract": "0xfbeef911dc5821886e1dda71586d90ed28174b7d",
        "nftContractName": "KnownOriginDigitalAsset",
        "nftId": "115851",
        "nftImage": "https://ipfs.infura.io/ipfs/Qma6W5ZfbJuqqufKabZ7NvtXarX7gFBEr3tRdgNsL7ZYMf",
        "nftName": "Tesla and his ideas",
        "nftTokenUri": "https://ipfs.infura.io/ipfs/QmbG7sFzrGb15CHdRV5z4w7p7GV8uK2L92i37YZWf4tM7v",
        "publisher": "0xf6423a8769292bbeef9335c5a26254c759e3bfbe",
        "tagger": "0x477cec669b2b22e79fad05d1c034fc9d897ad4ef",
        "timestamp": "1616644746"
      },
      {
        "hashtag": "#twitter",
        "hashtagDisplayHashtag": "#Twitter",
        "hashtagId": "3",
        "hashtagWithoutHash": "twitter",
        "id": "0x7ae34eab1d9de6fb2439bc6d2dc2aa9d1750d6b2bbdbd88042cad2671834811b",
        "nftContract": "0xfbeef911dc5821886e1dda71586d90ed28174b7d",
        "nftContractName": "KnownOriginDigitalAsset",
        "nftId": "268127",
        "nftImage": "https://ipfs.infura.io/ipfs/QmdbjJAoApvhgjhzU2mg6H447SRAbKGN8Do2w1UbXL9w8X/asset.png",
        "nftName": "Twitter vs Trump",
        "nftTokenUri": "https://ipfs.infura.io/ipfs/QmPno2pBJomppz3W9hFnFcpecY4ZPt3HR6oPxRdzuZg8de",
        "publisher": "0xf6423a8769292bbeef9335c5a26254c759e3bfbe",
        "tagger": "0x07bd3b64f9f51fe1d5c79f81dfc0460fff305b0e",
        "timestamp": "1616525667"
      },
      {
        "hashtag": "#tokenizeeverything",
        "hashtagDisplayHashtag": "#TokenizeEverything",
        "hashtagId": "1",
        "hashtagWithoutHash": "tokenizeeverything",
        "id": "0xfdefdc3f5ef8ca42eefd7ee23dafbdaadce412ca1e2c6c3994bbcc0b1f98cf1a",
        "nftContract": "0xfbeef911dc5821886e1dda71586d90ed28174b7d",
        "nftContractName": "KnownOriginDigitalAsset",
        "nftId": "81576",
        "nftImage": "https://ipfs.infura.io/ipfs/QmeqnEwnpcmNotkvorsW3B5qFgERwWcbzC3FwiDuc2bFyL",
        "nftName": "The revolution shell be tokenized. Unofficial poster - GLITCHY #1",
        "nftTokenUri": "https://ipfs.infura.io/ipfs/QmcKoLVUL1J2wvmNZToHCzeLDn8Z6rneEDDLyDVGjnkjL8",
        "publisher": "0xf6423a8769292bbeef9335c5a26254c759e3bfbe",
        "tagger": "0x477cec669b2b22e79fad05d1c034fc9d897ad4ef",
        "timestamp": "1616376815"
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

.participants {
  img {
    width: 90%;
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
