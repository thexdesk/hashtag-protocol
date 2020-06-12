<template>
  <div class="body">
    <section class="hero has-background-grey-dark is-bold">
      <div class="hero-head">
        <div class="container">
          <Header></Header>
        </div>
      </div>
    </section>
    <section class="main">
      <div class="container">
        <h1 class="title is-1">#{{ hashtagsByName[0].displayHashtag }}</h1>
        <h2 class="subtitle">Hashtag Protocol Token</h2>
        <div class="tile is-ancestor">
          <div class="tile is-horizontal">
            <div class="tile is-parent is-6 is-12-mobile">
              <div class="tile is-child box">
                <help-modal
                  modal="isOverviewModalActive"
                  @popModalFromChild="popModal"
                  class="is-pulled-right"
                ></help-modal>
                <h2 class="title is-4">Token overview</h2>
                <div class="b-table" v-if="hashtagsByName">
                  <div class="table-wrapper">
                    <table class="table">
                      <tbody>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Token ID</td>
                          <td>
                            {{ hashtagsByName[0].id }}
                            <b-tooltip
                              label="view on Etherscan"
                              position="is-bottom"
                              type="is-dark"
                              size="is-small"
                            >
                              <a v-bind:href="hashtagsByName[0].id">
                                <b-icon
                                  icon="ethereum"
                                  type="is-dark"
                                  size="is-small"
                                >
                                </b-icon>
                              </a>
                            </b-tooltip>
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Created</td>
                          <td>
                            <timestamp-formatted
                              :value="parseInt(hashtagsByName[0].timestamp)"
                            ></timestamp-formatted>
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Creator</td>
                          <td>
                            <eth-account
                              :value="hashtagsByName[0].owner"
                              route="owner-detail"
                            ></eth-account>
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Owner</td>
                          <td>
                            <eth-account
                              :value="hashtagsByName[0].owner"
                              route="owner-detail"
                            ></eth-account>
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Publisher</td>
                          <td>
                            <eth-account
                              :value="hashtagsByName[0].publisher"
                              route="publisher-detail"
                            ></eth-account>
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Expires</td>
                          <td>
                            <timestamp-formatted
                              :value="(parseInt(hashtagsByName[0].timestamp) + 63113904)"
                            ></timestamp-formatted>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="tile is-parent is-6 is-12-mobile">
              <div class="tile is-child box">
                <help-modal
                  modal="isSummaryModalActive"
                  @popModalFromChild="popModal"
                  class="is-pulled-right"
                ></help-modal>
                <h2 class="title is-4">Market summary</h2>
                <div class="b-table">
                  <div class="table-wrapper">
                    <table class="table">
                      <tbody>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Creation price</td>
                          <td>
                            0.8265 ETH<br />0.57855 to Publisher<br />0.24795 to
                            Protocol
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Tagged content</td>
                          <td>
                            {{ hashtagsByName[0].tagCount }}
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Tagging revenue</td>
                          <td>
                            0.000 Owner<br />0.000 Publisher<br />0.000 Protocol
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns is-tablet is-centered">
          <div class="column is-12">
            <article class="is-white box">
              <help-modal
                modal="isTaggedModalActive"
                @popModalFromChild="popModal"
                class="is-pulled-right"
              ></help-modal>
              <h2 class="title is-4 is-spaced">
                Content tagged with #{{ hashtag }}
              </h2>
              <b-tabs v-model="activeTab" :animated="true">
                <b-tab-item label="ERC-721 NFTs">
                  <div class="b-table">
                    <!---->
                    <!---->
                    <div class="table-wrapper has-mobile-cards">
                      <table class="table">
                        <thead>
                          <tr>
                            <!---->
                            <!---->
                            <th class="" style="width: 75px;">
                              <div class="th-wrap"><!----></div>
                            </th>
                            <th class="">
                              <div class="th-wrap">
                                Asset Name
                                <!---->
                              </div>
                            </th>
                            <th class="">
                              <div class="th-wrap">
                                Project
                                <!---->
                              </div>
                            </th>
                            <th class="">
                              <div class="th-wrap">
                                Tagged
                                <!---->
                              </div>
                            </th>
                            <th class="">
                              <div class="th-wrap">
                                Tagger
                                <!---->
                              </div>
                            </th>
                            <th class="">
                              <div class="th-wrap">
                                Publisher
                                <!---->
                              </div>
                            </th>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                        </thead>
                        <tbody v-if="tagsByHashtag">
                          <tr
                            v-for="tag in tagsByHashtag"
                            v-bind:key="tag.id"
                            draggable="false"
                            class=""
                          >
                            <td data-label="" class="">
                              <img
                                :src="tag.nftImage"
                                style="max-width: 75px; max-height: 75px;"
                              />
                            </td>
                            <td data-label="Asset Name" class="">
                              {{ tag.nftName }}
                            </td>
                            <td data-label="Project" class="">
                              {{ tag.nftContractName }}
                            </td>
                            <td data-label="Tagged" class="">
                              <timestamp-from
                                :value="tag.timestamp"
                              ></timestamp-from>
                            </td>
                            <td data-label="Tagger" class="">
                              <eth-account
                                :value="tag.tagger"
                                route="tagger-detail"
                              ></eth-account>
                            </td>
                            <td data-label="Publisher" class="">
                              <eth-account
                                :value="tag.publisher"
                                route="publisher-detail"
                              ></eth-account>
                            </td>
                          </tr>
                        </tbody>
                        <!---->
                      </table>
                    </div>
                    <!---->
                  </div>
                </b-tab-item>
                <b-tab-item label="IPFS" :disabled="true">
                  Coming soon...
                </b-tab-item>
                <b-tab-item label="Unstoppable domains" :disabled="true">
                  Coming soon...
                </b-tab-item>
              </b-tabs>
            </article>
          </div>
        </div>
      </div>
      <b-modal :active.sync="isOverviewModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Token overview</p>
              </div>
            </div>
            <div class="content">
              <p>
                <strong>Token ID</strong> - Numerical Id for this token on the
                Ethereum blockchain.
              </p>
              <p>
                <strong>Created</strong> - Date this token was created and added
                to Ethereum blockchain.
              </p>
              <p>
                <strong>Publisher</strong> - Ethereum address of application
                implementing Hashtag Protocol where this token was created. This
                address receives a share of token creation fee.
              </p>
              <p>
                <strong>Creator</strong> - Ethereum address that payed the token
                creation fee.
              </p>
              <p>
                <strong>Owner</strong> - Ethereum address of current token
                owner. This address receives a share of content tagging fee.
              </p>
              <p>
                <strong>Expires</strong> - Date from which Owner has 30 days to
                renew token ownership. This is done by sending a transaction to
                the token contract signed by the current owner address. If token
                is not renewed within 30 days, ownership is transferred to the
                Protocol.
              </p>
              <b-collapse
                :open="false"
                aria-id="tokenOverview"
                animation="slide"
              >
                <a
                  slot="trigger"
                  slot-scope="props"
                  aria-controls="tokenOverview"
                  class="has-text-weight-bold"
                >
                  <b-icon
                    :icon="!props.open ? 'menu-down' : 'menu-up'"
                  ></b-icon>
                  {{
                    !props.open
                      ? "What's a Hashtag Token?"
                      : "What's a Hashtag Token?"
                  }}
                </a>
                <p>
                  <br />
                  Hashtag Tokens are digital representations of hashtag text
                  strings stored on the Ethereum blockchain. The Hashtag
                  Protocol uses the
                  <a v-bind:href="erc721"
                    >Ethereum ERC-721 specification
                    <b-icon icon="open-in-new" size="is-small"> </b-icon
                  ></a>
                  for Hashtag Tokens. This specification has a few properties
                  that makes it both ideally suited for and perhaps
                  revolutionary to the use of hashtags. First, as opposed to the
                  more common ERC-20 specification in which many, identical
                  copies of a digital token exist, each ERC-721 token is
                  completely unique; there is and always be only one copy.
                  Because of this, ERC-721 tokens are ideally suited to
                  represent or contain one-of-a-kind items of value; artworks,
                  gaming skins, movie tickets, domain names, real estate titles.
                  In the case of the Hashtag Protocol, each Hashtag Token both
                  contains and represents a unique hashtag string. Second, as
                  digital assets, Hashtag Tokens can be created, bought and sold
                  by anyone.
                </p>
              </b-collapse>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal :active.sync="isSummaryModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Market summary</p>
              </div>
            </div>
            <div class="content">
              <p>
                <strong>Creation price</strong> - Amount the winning bidder pays
                to acquire a newly created Hashtag Token.
              </p>
              <p>
                <strong>Tag count</strong> - How many content items have been
                tagged with this hashtag.
              </p>
              <p>
                <strong>Earnings</strong> - Total tagging revenue distributed by
                the Protocol for this Hashtag token.
              </p>
              <b-collapse
                :open="false"
                aria-id="MarketOverview"
                animation="slide"
              >
                <a
                  slot="trigger"
                  slot-scope="props"
                  aria-controls="MarketOverview"
                  class="has-text-weight-bold"
                >
                  <b-icon
                    :icon="!props.open ? 'menu-down' : 'menu-up'"
                  ></b-icon>
                  {{
                    !props.open
                      ? 'What is the "Hashtag Market"?'
                      : 'What is the "Hashtag Market"?'
                  }}
                </a>
                <p>
                  <br />
                  Hashtag is a protocol on the Ethereum blockchain that creates
                  a market & incentive economy around the creation and use of
                  hashtags. The protocol aims to create a virtuous, financially
                  incentivized system that creates more value to all
                  participants the more it grows.
                </p>
                <p>
                  The system revolves around four participants: Creator, Owner,
                  Publisher and Tagger. These key market participants interact
                  directly with the protocol, paying to use and earning from the
                  system without having to negotiate terms of use. The data
                  generated by the protocol is immutable (impervious to
                  censorship) and globally accessible.
                </p>
                <p>
                  Hashtag Protocol uses an auction method to determine the price
                  of a new Hashtag Token. The "creation price" is the amount the
                  winning bidder pays to acquire the newly created Hashtag
                  Token. The proceeds of the auction are automatically divided
                  between the originating Publisher and the Protocol.
                </p>
                <p>
                  In addition to creating unique, non-fungible tokens that both
                  contain and represent a single, natural language hashtag, the
                  Protocol also provides facilities for linking a token any
                  online digital artifact, effectively tagging that content with
                  the hashtag. Tag count quantifies how many pieces of content
                  have been tagged with this hashtag.
                </p>
                <p>
                  In exchange for facilitating an entry to a decentralized,
                  immutable and globally accessible database, the Protocol
                  collects a small fee from the Tagger when they tag content.
                  The Protocol smart contract then automatically distributes
                  this fee among the token owner, the publisher facilitating the
                  tagging and the Protocol.
                </p>
              </b-collapse>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal :active.sync="isTaggedModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Tagged content</p>
              </div>
            </div>
            <div class="content">
              <p>
                <strong>ERC-721 NFTs</strong><br />Listing of ERC-721
                non-fungible tokens (digital assets) tagged with
                <strong>#{{ hashtagsByName[0].displayHashtag }}</strong
                >.
              </p>
              <ul>
                <li>
                  <strong>Asset name</strong> - Name of the ERC-721 token
                  tagged.
                </li>
                <li>
                  <strong>Project</strong> - Name of project producing the
                  digital assets that Hashtag Tokens are being linked to.
                </li>
                <li><strong>Tagged</strong> - Date asset was tagged.</li>
                <li>
                  <strong>Tagger</strong> - Ethereum address used to pay tagging
                  fee.
                </li>
                <li>
                  <strong>Publisher</strong> - Ethereum address of the Publisher
                  platform tagging took place on.
                </li>
              </ul>
              <b-collapse
                :open="false"
                aria-id="taggedContent"
                animation="slide"
              >
                <a
                  slot="trigger"
                  slot-scope="props"
                  aria-controls="taggedContent"
                  class="has-text-weight-bold"
                >
                  <b-icon
                    :icon="!props.open ? 'menu-down' : 'menu-up'"
                  ></b-icon>
                  {{
                    !props.open
                      ? 'What is "tagged content?"'
                      : 'What is "tagged content?"'
                  }}
                </a>
                <p>
                  <br />In addition to creating crytographic tokens that both
                  contain and represent hashtag strings, Hashtag Protocol
                  provides a facility for linking them to any online digital
                  artifact, effectively "tagging" that content with the hashtag.
                  This is facilitated by "linking smart contracts" that support
                  a many-to-many token-to-content relationship. For example, one
                  Hashtag Token can be used to tag many pieces of content and
                  one price of content can be tagged with many hashtags.
                  Presently, only linking to other ERC-721 NFTs is supported.
                  The Protocol can be extended to tag other digital assets.
                </p>
              </b-collapse>
            </div>
          </div>
        </div>
      </b-modal>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import EthAccount from "../components/EthAccount";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HelpModal from "../components/HelpModal";
import { TAGS_BY_HASHTAG, HASHTAGS_BY_NAME } from "../queries";
import TimestampFrom from "../components/TimestampFrom";
import TimestampFormatted from "../components/TimestampFormatted";

export default {
  name: "HashtagDetail",
  components: {
    TimestampFormatted,
    TimestampFrom,
    EthAccount,
    Footer,
    Header,
    HelpModal,
  },
  data() {
    return {
      activeTab: null,
      erc721: "http://erc721.org",
      hashtag: this.$route.params.hashtag,
      hashtagsByName: null,
      isOverviewModalActive: false,
      isSummaryModalActive: false,
      isTaggedModalActive: false,
      tagsByHashtag: null,
    };
  },
  apollo: {
    tagsByHashtag: {
      query: TAGS_BY_HASHTAG,
      variables() {
        return {
          hashtag: this.hashtag && this.hashtag.toLowerCase(),
        };
      },
      pollInterval: 1000, // ms
    },
    hashtagsByName: {
      query: HASHTAGS_BY_NAME,
      variables() {
        return {
          name: this.hashtag && this.hashtag.toLowerCase(),
        };
      },
      pollInterval: 1000, // ms
    },
  },
};
</script>

<style lang="scss"></style>
