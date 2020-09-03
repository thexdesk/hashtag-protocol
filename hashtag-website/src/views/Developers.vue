<template>
  <div class="body">
    <section class="nav has-background-white">
      <div class="container">
        <Navbar></Navbar>
      </div>
    </section>
    <div class="section is-medium has-background-white">
      <div class="container">
        <div class="columns">
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
          <div class="column">
            <span class="image">
              <img
                :src="require(`../assets/img/tagging-contracts-roadmap.png`)"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="section is-medium has-background-dark">
      <div class="container">
        <div class="columns">
          <div class="column is-one-third">
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
                method or
                <span class="is-family-code has-text-primary"
                  >mintAndTag()</span
                >
                in the ERC-721 smart contract on a participating publisher
                application. At the present time, only whitelisted publisher
                addresses may mint Hashtag Tokens.
              </p>
              <p>
                Minting fees, paid for by the Ethereum address minting the
                token, are split 70/30 between the publisher application and the
                Protocol.
              </p>
            </div>
          </div>
          <div class="column is-two-thirds">
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
        <div class="columns">
          <div class="column">
            <h2 class="title is-spaced">
              Tag content with Hashtag Tokens
            </h2>
            <div class="content is-medium">
              <p>
                Hashtag provides smart contracts for linking a Hashtag token to
                any online digital artifact, effectively “tagging” that content
                with a hashtag string. Tagging contract design allows for a
                digital asset to be tagged with any number of hashtag tokens and
                conversely, any single hashtag token to tag many digital assets.
              </p>
              <p>
                Tagging contracts require a micro-fee paid for by the user or
                platform executing the tagging contract; the proceeds are shared
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
          <div class="column">
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
    <div class="section is-medium has-background-dark">
      <div class="container">
        <div class="columns">
          <div class="column is-half">
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
            </div>
          </div>
          <div class="column is-half">
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
                Hashtag Protocol seeks to reward all participants of the system.
              </p>
              <h4>
                Application developer / content publisher
              </h4>
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

              <h4>
                Hashtag Token creator & owner
              </h4>
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
              <h4>
                Token minting revenue
              </h4>
              <span class="image">
                <img
                  :src="require(`../assets/img/minting-revenue-sharing.svg`)"
                />
              </span>
              <hr />
              <h4>
                Content tagging revenue
              </h4>
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
    <Footer>
      <span v-if="platform" class="has-text-grey-light">
        Platform revenue
        <eth-amount-sum
          :value1="platform.mintFees"
          :value2="platform.tagFees"
        ></eth-amount-sum>
      </span>
    </Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default {
  name: "Developers",
  components: {
    Footer,
    Navbar,
  },
  data() {
    // prettier-ignore
    return {
      query: `// Blah blah
query {
  hashtags(first: 1, orderBy: timestamp, orderDirection: desc) {
    id
    name
    owner
    publisher
    timestamp
  }
}`,
      queryReturn: `
{
  "data": {
    "hashtags": [
      {
        "id": "10",
        "name": "mountains",
        "owner": "0x07bd3b64f9f51fe1d5c79f81dfc0460fff305b0e",
        "publisher": "0xd677aed0965ac9b54e709f01a99ceca205aebc4b",
        "timestamp": "1596246628"
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
};
</script>

<style lang="scss">
.nav {
  padding: 0.75rem 0;
}

code {
  .token.number {
    color: #fff;
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
        color: #fff;
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
</style>
