<template>
  <div class="body">
    <section class="nav has-background-white">
      <div class="container">
        <Navbar></Navbar>
      </div>
    </section>
    <div class="section is-medium has-background-white">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column">
            <h1 class="is-size-1 title is-spaced">
              Provide your users rich, decentralized content tagging stored to a
              global, immutable database.
            </h1>
            <div class="content is-size-5 is-spaced">
              <p>
                At its core, Hashtag Protocol is conceptually simple: it’s a set
                of Ethereum smart contracts that enables the tokenization of
                hashtag strings into ERC-721 non-fungible tokens; the “tagging”
                of other digital assets with those tokens; and APIs for
                surfacing this data for use in networks, platforms and
                applications.
              </p>
            </div>
          </div>
          <div class="column is-5 is-offset-1">
            <div class="content has-text-centered is-size-5 is-spaced box">
              <strong>Demo:</strong>&nbsp;
              <a :href="this.app">Hashtag dApp</a>
              <hr />
              <strong>Technical:</strong>&nbsp; <a :href="this.docs">Docs</a>,
              <a :href="designNotes" download="hashtag-protocol.pdf"
                >Design notes</a
              >,
              <a href="/build">Github repo</a>
              <hr />
              <strong>Social:</strong>&nbsp; <a href="/build">Discord</a>,
              <a href="https://hashtagprotocol.substack.com">Substack</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section is-medium has-background-dark">
      <div class="container">
        <div class="columns">
          <div class="column is-4">
            <h2 class="title is-spaced has-text-white-ter">
              Create Hashtag Tokens
            </h2>
            <div class="content is-medium has-text-white-ter">
              <p>
                Hashtag Tokens are digital representations of hashtag text
                strings stored on the Ethereum blockchain. Hashtag uses the
                <a href="http://erc721.org/">Ethereum ERC-721</a> specification
                for Hashtag Tokens. Tokens are created by executing the
                <span class="is-family-code has-text-primary">mint()</span>
                or
                <span class="is-family-code has-text-primary"
                  >mintAndTag()</span
                >
                methods in the ERC-721 smart contract on a participating
                publisher application. At the present time, only whitelisted
                publisher addresses may mint Hashtag Tokens.
              </p>
              <p>
                Minting fees, paid for by the Ethereum address minting the
                token, are split 70/30 between the publisher application and the
                Protocol.
              </p>
            </div>
          </div>
          <div class="column is-offset-1 is-7">
            <div class="is-size-6 create-tokens line-numbers">
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
    </div>
    <div class="section is-medium has-background-white">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-5">
            <h2 class="title is-spaced">Tag content with Hashtag Tokens</h2>
            <div class="content is-medium">
              <p>
                Hashtag provides smart contracts for linking a Hashtag Token to
                any online digital artifact, effectively “tagging” that content
                with a hashtag string. Tagging contract design allows for a
                digital asset to be tagged with any number of Hashtag Tokens and
                conversely, any single Hashtag Token to tag many digital assets.
              </p>
              <p>
                Tagging contracts collect a micro-fee paid for by the user or
                platform executing the contract. Tagging proceeds are shared
                among the Hashtag Token owner, the publisher facilitating the
                tagging event, and the Protocol.
              </p>
              <p>
                Our first tagging contract supports tagging other ERC-721
                non-fungible tokens. The Protocol roadmap includes plans to add
                tagging contracts for other digital/online artifacts as well as
                community contributed tagging contracts.
              </p>
            </div>
          </div>
          <div class="column is-offset-1">
            <div class="content">
              <template>
                <b-carousel
                  :autoplay="false"
                  :indicator-inside="false"
                  indicator-style="is-boxes"
                >
                  <b-carousel-item
                    v-for="(schema, i) in taggingSchema"
                    :key="i"
                  >
                    <span class="image">
                      <img :src="require(`../assets/img/${schema.img}.png`)" />
                    </span>
                  </b-carousel-item>
                </b-carousel>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section is-medium has-background-dark subgraph">
      <div class="container">
        <div class="columns">
          <div class="column is-5">
            <h2 class="title is-spaced has-text-white-ter">
              Surface and display Hashtag data in new and meaningful ways.
            </h2>
            <div class="content is-medium has-text-white-ter">
              <p>
                Minting and tagging events are captured by the Hashtag Protocol
                Subgraph.
              </p>
              <p>
                Utilize our Hashtag Subgraph to rapidly query Protocol
                transaction data and present in your own way.
              </p>
              <p>See our documentation site for the full set of data lenses.</p>
            </div>
          </div>
          <div class="column is-offset-1">
            <div class="is-size-6 create-tokens line-numbers">
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
    </div>
    <div class="section is-medium has-background-white">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column">
            <h2 class="title is-spaced">
              Generate revenue from Hashtag’s permissionless, decentralized
              tagging protocol.
            </h2>
            <div class="content is-size-5">
              <p>
                Hashtag Protocol seeks to incentivise all participants of the
                system.
              </p>
              <h4>Application developer / content publisher</h4>
              <ul>
                <li>
                  Enable social & machine tagging of digital assets & artifacts
                  to an immutable, global database.
                </li>
                <li>
                  Earn 70% of the Token minting fee, paid by the Ethereum
                  address minting the token, for Hashtag Tokens minted on your
                  platform.
                </li>
                <li>
                  Earn 20% of the content tagging micro-fee, paid by the
                  Ethereum address tagging content, for content tagged with
                  <em>any</em> Hashtag Token.
                </li>
                <li>
                  Expose content & tagging data from your platform to other
                  dApps, applications and systems.
                </li>
                <li>
                  Surface tagging data and present it in new and meaningful
                  ways.
                </li>
              </ul>

              <h4>Hashtag Token creator & owner</h4>
              <ul>
                <li>
                  Users can create (“mint”) Hashtag tokens on any participating
                  publisher platform; in effect becoming the Hashtag "owner".
                </li>
                <li>
                  Token Owners earn 70% of tagging micro-fee, paid by the
                  Ethereum address tagging content, when Hashtag Tokens they own
                  are used to tag any content on any publisher platform.
                </li>
                <li>
                  Buy or sell Hashtag Tokens on a secondary NFT market such as
                  OpenSea.io.
                </li>
              </ul>

              <h4>Content tagger</h4>
              <ul>
                <li>
                  The "content tagger" is any user or machine that executes a
                  Hashtag Protocol tagging contract. Reasons for tagging content
                  are the same as in centralized social media and social
                  bookmarking platforms. In exchange for a micro-fee, tagged
                  content is broadcast from the publisher application to a
                  global, immutable database freely accessible by any
                  application.
                </li>
                <li>
                  By tagging content, taggers make easier to find within a
                  publisher application.
                </li>
                <li>
                  Enrich the metaverse by linking previously isolated digital
                  artifacts
                </li>
              </ul>
            </div>
          </div>
          <div class="column">
            <div class="content has-text-centered is-size-5">
              <h4>Token minting revenue</h4>
              <span class="image">
                <img
                  :src="require(`../assets/img/minting-revenue-sharing.svg`)"
                />
              </span>
              <hr />
              <h4>Content tagging revenue</h4>
              <span class="image">
                <img
                  :src="require(`../assets/img/tagging-revenue-sharing.svg`)"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Hashtag from "../components/Hashtag";
import Navbar from "../components/Navbar";
import NftLink from "../components/NftLink";
import { SNAPSHOT } from "@/queries";

export default {
  name: "Developers",
  components: {
    Footer,
    Hashtag,
    Navbar,
    NftLink,
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
