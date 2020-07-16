<template>
  <div class="body">
    <section class="hero has-background-grey-dark is-bold">
      <div class="hero-head">
        <div class="container">
          <Header></Header>
        </div>
      </div>
    </section>
    <section class="main" v-if="ownerByAcc">
      <div class="container">
        <h1 class="title is-1">
          Owner: <eth-account :value="owner"></eth-account>
        </h1>
        <h2 class="subtitle">Hashtag Protocol Token Owner</h2>
        <div class="tile is-ancestor">
          <div class="tile is-horizontal">
            <div class="tile is-parent is-6 is-12-mobile">
              <div class="tile is-child box">
                <help-modal
                  modal="isOverviewModalActive"
                  @popModalFromChild="popModal"
                  class="is-pulled-right"
                ></help-modal>
                <h2 class="title is-4">Owner information</h2>
                <div class="b-table">
                  <div class="table-wrapper">
                    <table class="table">
                      <tbody>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Owner address</td>
                          <td>
                            <eth-account :value="owner"></eth-account>
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
                  modal="isMarketSummaryActive"
                  @popModalFromChild="popModal"
                  class="is-pulled-right"
                ></help-modal>
                <h2 class="title is-4">Market summary</h2>
                <div class="b-table" v-if="ownerByAcc">
                  <div class="table-wrapper">
                    <table class="table">
                      <tbody>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Hashtags</td>
                          <td>
                            {{ ownerByAcc.mintCount }}
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Tagged content</td>
                          <td>
                            {{ ownerByAcc.tagCount }}
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Tagging revenue</td>
                          <td>
                            <eth-amount
                              :value="ownerByAcc.tagFees"
                            ></eth-amount>
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Total revenue</td>
                          <td>
                            <eth-amount-sum
                              :value1="ownerByAcc.tagFees"
                              :value2="0"
                            ></eth-amount-sum>
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
              <b-tooltip
                label="Help"
                position="is-bottom"
                class="is-pulled-right"
                type="is-dark"
              >
                <button
                  class="button is-white"
                  @click="isTaggedModalActive = true"
                >
                  <b-icon icon="help-circle-outline" type="is-dark"> </b-icon>
                </button>
              </b-tooltip>
              <h2 class="title is-4 is-spaced">
                Activity for <eth-account :value="owner"></eth-account>
              </h2>
              <b-tabs v-model="activeTab" :animated="false">
                <b-tab-item label="Hashtags">
                  <div class="b-table">
                    <!---->
                    <!---->
                    <div class="table-wrapper has-mobile-cards">
                      <table class="table">
                        <thead>
                          <tr>
                            <!---->
                            <!---->
                            <th class="">
                              <div class="th-wrap">
                                Hashtag
                                <!---->
                              </div>
                            </th>
                            <th class="">
                              <div class="th-wrap">
                                Created
                                <!---->
                              </div>
                            </th>
                            <th class="">
                              <div class="th-wrap">
                                Creator
                                <!---->
                              </div>
                            </th>
                            <th class="">
                              <div class="th-wrap">
                                Publisher
                                <!---->
                              </div>
                            </th>
                          </tr>
                          <!---->
                          <!---->
                        </thead>
                        <tbody>
                          <tr
                            draggable="false"
                            class=""
                            v-for="hashtag in hashtagsByOwner"
                            v-bind:key="hashtag.id"
                          >
                            <!---->
                            <!---->
                            <td data-label="Hashtag" class="">
                              <hashtag :value="hashtag.name"></hashtag>
                            </td>
                            <td data-label="Created" class="">
                              <timestamp-from
                                :value="hashtag.timestamp"
                              ></timestamp-from>
                            </td>
                            <td data-label="Creator" class="">
                              <eth-account
                                :value="hashtag.owner"
                                route="owner-detail"
                              ></eth-account>
                            </td>
                            <td data-label="Publisher" class="">
                              <eth-account
                                :value="hashtag.publisher"
                                route="publisher-detail"
                              ></eth-account>
                            </td>
                          </tr>
                        </tbody>
                        <!---->
                      </table>
                      <Pagination
                        :entity-count="hashtagsTab.hashtagsCount"
                        :page-size="hashtagsTab.pageSize"
                        @tabSelected="hashtagsTabSelected"
                      />
                    </div>
                    <!---->
                  </div>
                </b-tab-item>
                <b-tab-item label="Tagged content">
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
                                Hashtag
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
                          </tr>
                          <!---->
                          <!---->
                        </thead>
                        <tbody>
                          <tr v-for="tag in tagsByTagger" v-bind:key="tag.id">
                            <td data-label="" class="">
                              <figure class="image">
                                <img :src="tag.nftImage" :alt="tag.nftName" />
                              </figure>
                            </td>
                            <td data-label="Asset Name" class="">
                              <nft-link
                                type="nft"
                                :name="tag.nftName"
                                :contract="tag.nftContract"
                                :id="tag.nftId"
                              ></nft-link>
                            </td>
                            <td data-label="Asset Name" class="">
                              {{ tag.nftContractName }}
                            </td>
                            <td data-label="Hashtag" class="">
                              <hashtag :value="tag.hashtagName"></hashtag>
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
                          </tr>
                        </tbody>
                        <!---->
                      </table>
                      <Pagination
                        :entity-count="taggedContentTab.taggedCount"
                        :page-size="taggedContentTab.pageSize"
                        @tabSelected="taggedContentTabSelected"
                      />
                    </div>
                    <!---->
                  </div>
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
                <p class="title is-4">Owner information</p>
              </div>
            </div>
            <div class="content">
              <p>
                <strong>Owner address</strong> - An Ethereum address that owns
                one or more Hasthag Protocol tokens.
              </p>
              <b-collapse
                :open="false"
                position="is-top"
                aria-id="ownerOverview"
                animation="slide"
              >
                <a
                  slot="trigger"
                  slot-scope="props"
                  aria-controls="ownerOverview"
                  class="has-text-weight-bold"
                >
                  <b-icon
                    :icon="!props.open ? 'menu-down' : 'menu-up'"
                  ></b-icon>
                  {{
                    !props.open ? 'What\'s an "Owner?"' : 'What\'s an "Owner"?'
                  }}
                </a>
                <p>
                  <br />
                  Simply put, an “Owner” is an Ethereum address that owns one or
                  more Hashtag Tokens. An “Owner” can come to “own” a Hashtag
                  Token by either creating one on a participating Publisher
                  platform, or by purchasing one on a secondary market such as
                  OpenSea.io. As soon as a Hashtag Token is created, the
                  “Creator” becomes de facto “Owner”. The successful purchaser
                  of a Hashtag Token on the secondary market becomes the new
                  “Owner” of that Hashtag Token, and assumes certain benefits
                  that include but are not limited to:
                </p>
                <ol>
                  <li>
                    Sole ownership of a unique Hashtag Token containing and
                    representing a unique hashtag string.
                  </li>
                  <li>
                    Dividends received from The Protocol when a Tagger tags
                    content with their hashtag.
                  </li>
                  <li>
                    Ability to re-sell their token either peer-to-peer or on a
                    standard NFT marketplace such as Opensea.
                  </li>
                </ol>
              </b-collapse>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal :active.sync="isMarketSummaryActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Market summary</p>
              </div>
            </div>
            <div class="content">
              <p>
                <strong>Hashtags</strong> - Current number of Hasthag Protocol
                tokens owned by this Owner.
              </p>
              <p>
                <strong>Hashtag revenue</strong> - Total revenue for Hasthag
                Protocol tokens sold by this Owner.
              </p>
              <p>
                <strong>Tagged content</strong> - Number of content items tagged
                with this owner's hashtags.
              </p>
              <p>
                <strong>Tagging revenue</strong> - Revenue from content tagged
                with this owner's hashtags.
              </p>
              <p>
                <strong>Total revenue</strong> - Total Hashtag Protocol revenue
                for this owner.
              </p>
              <p>
                <strong>Total revenue</strong> - Total Hashtag Protocol revenue
                for this Publisher.
              </p>
              <b-collapse
                :open="false"
                position="is-top"
                aria-id="ownerOverview"
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
                <p class="title is-4">Owner activity</p>
              </div>
            </div>
            <div class="content">
              <p>
                <strong>Hashtags</strong><br />Listing of Hasthag Protocol
                tokens owned by this address.
              </p>
              <ul>
                <li>
                  <strong>Created</strong> - Date token was created and added to
                  Ethereum blockchain.
                </li>
                <li>
                  <strong>Publisher</strong> - Ethereum address of application
                  implementing Hashtag Protocol where token was created.
                </li>
              </ul>
              <p>
                <strong>Tagged content</strong><br />Listing of content tagged
                with hashtags owned by this address. Protocol currently supports
                tagging other ERC-721 tokens.
              </p>
              <ul>
                <li>
                  <strong>Asset name</strong> - Name of the ERC-721 token.
                </li>
                <li>
                  <strong>Project</strong> - Name of project producing the
                  digital assets that Hashtag Tokens are being linked to.
                </li>
                <li>
                  <strong>Hashtag</strong> - Hashtag Token the asset is tagged
                  with.
                </li>
                <li><strong>Tagged</strong> - Date asset was tagged.</li>
                <li>
                  <strong>Tagger</strong> - Ethereum address used to pay tagging
                  fee.
                </li>
              </ul>
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
import {
  PAGED_HASHTAGS_BY_OWNER,
  OWNER_BY_ACC,
  PAGED_TAGS_BY_TAGGER,
  ALL_TAG_IDS_BY_TAGGER,
  ALL_HASHTAG_IDS_BY_OWNER,
} from "../queries";
import EthAmount from "../components/EthAmount";
import EthAmountSum from "../components/EthAmountSum";
import Hashtag from "../components/Hashtag";
import TimestampFrom from "../components/TimestampFrom";
import NftLink from "../components/NftLink";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 10;

export default {
  name: "OwnerDetail",
  components: {
    NftLink,
    TimestampFrom,
    Hashtag,
    EthAmountSum,
    EthAmount,
    EthAccount,
    Footer,
    Header,
    HelpModal,
    Pagination,
  },
  data() {
    return {
      activeTab: null,
      isOverviewModalActive: false,
      isMarketSummaryActive: false,
      isTaggedModalActive: false,
      owner: this.$route.params.address,
      tagsByHashtag: null,
      hashtagsByName: null,
      hashtagsTab: {
        pageSize: PAGE_SIZE,
        first: PAGE_SIZE,
        skip: 0,
        hashtagsCount: 0,
      },
      taggedContentTab: {
        pageSize: PAGE_SIZE,
        first: PAGE_SIZE,
        skip: 0,
        taggedCount: 0,
      },
    };
  },
  apollo: {
    ownerByAcc: {
      query: OWNER_BY_ACC,
      variables() {
        return {
          id: this.owner,
        };
      },
    },
    hashtagsByOwner: {
      query: PAGED_HASHTAGS_BY_OWNER,
      variables() {
        return {
          owner: this.owner,
          first: this.hashtagsTab.first,
          skip: this.hashtagsTab.skip,
        };
      },
    },
    hashtagsByOwnerCount: {
      query: ALL_HASHTAG_IDS_BY_OWNER,
      manual: true,
      result({ data }) {
        this.hashtagsTab.hashtagsCount = data.allHashtagsByOwner.length;
      },
      variables() {
        return {
          owner: this.owner,
        };
      },
    },
    tagsByTagger: {
      query: PAGED_TAGS_BY_TAGGER,
      variables() {
        return {
          tagger: this.owner,
          first: this.taggedContentTab.first,
          skip: this.taggedContentTab.skip,
        };
      },
    },
    tagsByTaggerCount: {
      query: ALL_TAG_IDS_BY_TAGGER,
      manual: true,
      result({ data }) {
        this.taggedContentTab.taggedCount = data.allTagIdsByTagger.length;
      },
      variables() {
        return {
          tagger: this.owner,
        };
      },
    },
  },
  methods: {
    hashtagsTabSelected(pageId) {
      this.hashtagsTab.skip = pageId * PAGE_SIZE;
    },
    taggedContentTabSelected(pageId) {
      this.taggedContentTab.skip = pageId * PAGE_SIZE;
    },
  },
};
</script>

<style lang="scss"></style>
