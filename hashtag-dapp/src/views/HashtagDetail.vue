<template>
  <div class="body">
    <section class="hero has-background-grey-dark is-bold">
      <div class="hero-head">
        <div class="container">
          <Header></Header>
        </div>
      </div>
    </section>
    <section class="main" v-if="hashtagsByName && hashtagsByName[0]">
      <div class="container">
        <h1 class="title is-1">{{ hashtagsByName[0].displayHashtag }}</h1>
        <h2 class="subtitle">
          Hashtag Protocol Token
          <span class="is-pulled-right is-size-6 has-text-weight-bold">
            <router-link :to="{ name: 'hashtags' }">Browse hashtags</router-link
            >&nbsp;
            <b-icon icon="arrow-up" type="is-dark" size="is-small"></b-icon>
          </span>
        </h2>
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
                            <HashtagTokenId
                              :value="hashtagsByName[0].id"
                            ></HashtagTokenId>
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
                              :value="
                                parseInt(hashtagsByName[0].timestamp) + 63113904
                              "
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
                            {{ hashtagsByName[0].totalMintingFee | toEth }}
                            Ξ<br />{{
                              hashtagsByName[0].publisherMintingFee | toEth
                            }}
                            Ξ to Publisher<br />{{
                              hashtagsByName[0].platformMintingFee | toEth
                            }}
                            Ξ to Protocol
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
                            {{ hashtagsByName[0].ownerRevenue | toEth }} Ξ
                            Owner<br />{{
                              hashtagsByName[0].publisherRevenue | toEth
                            }}
                            Ξ Publisher<br />{{
                              hashtagsByName[0].protocolRevenue | toEth
                            }}
                            Ξ Protocol
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
                Content tagged with {{ hashtag }}
              </h2>
              <b-tabs v-model="activeTab" :animated="true">
                <b-tab-item label="ERC-721 NFTs">
                  <div class="b-table">
                    <div class="table-wrapper has-mobile-cards">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>
                              <div class="th-wrap"></div>
                            </th>
                            <th>
                              <div class="th-wrap">Asset Name</div>
                            </th>
                            <th>
                              <div class="th-wrap">Project</div>
                            </th>
                            <th>
                              <div class="th-wrap">Tagged</div>
                            </th>
                            <th>
                              <div class="th-wrap">Tagger</div>
                            </th>
                            <th>
                              <div class="th-wrap">Publisher</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody v-if="tagsByHashtag">
                          <tr
                            v-for="tag in tagsByHashtag"
                            v-bind:key="tag.id"
                            draggable="false"
                            class=""
                          >
                            <td class="has-text-centered">
                              <router-link
                                :to="{
                                  name: 'nft-detail',
                                  params: {
                                    type: 'nft',
                                    contract: tag.nftContract,
                                    id: tag.nftId,
                                  },
                                }"
                              >
                                <img
                                  :src="tag.nftImage"
                                  :alt="tag.nftName"
                                  class="nft-thumb"
                                />
                              </router-link>
                            </td>
                            <td data-label="Asset Name">
                              <nft-link
                                type="nft"
                                :name="tag.nftName"
                                :contract="tag.nftContract"
                                :id="tag.nftId"
                              ></nft-link>
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
                      </table>
                      <Pagination
                        :entity-count="tagsCount"
                        :page-size="pageSize"
                        @tabSelected="tabSelected"
                      />
                    </div>
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
            <div class="content">
              <markdown-doc
                doc-type="help"
                filename="hashtag-detail-token-overview"
              ></markdown-doc>
              <b-collapse
                :open="false"
                aria-id="tokenOverview"
                animation="slide"
                class="pt-1 pb-1"
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
                <markdown-doc
                  doc-type="faq"
                  filename="020-what-is-hashtag-token"
                  class="pt-1 pb-1"
                ></markdown-doc>
              </b-collapse>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal :active.sync="isSummaryModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <markdown-doc
                doc-type="help"
                filename="hashtag-detail-market-summary"
              ></markdown-doc>
              <b-collapse
                :open="false"
                aria-id="MarketOverview"
                animation="slide"
                class="pt-1 pb-1"
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
                <markdown-doc
                  doc-type="faq"
                  filename="070-what-is-the-hashtag-market"
                  class="pt-1 pb-1"
                ></markdown-doc>
              </b-collapse>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal :active.sync="isTaggedModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <markdown-doc
                doc-type="help"
                filename="hashtag-detail-tagged-content"
              ></markdown-doc>
              <b-collapse
                :open="false"
                aria-id="taggedContent"
                animation="slide"
                class="pt-1 pb-1"
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
                <markdown-doc
                  docType="faq"
                  filename="030-what-is-tagged-content"
                  class="pt-1 pb-1"
                ></markdown-doc>
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
import HashtagTokenId from "../components/HashtagTokenId";
import Header from "../components/Header";
import HelpModal from "../components/HelpModal";
import MarkdownDoc from "../components/MarkdownDoc";
import NftLink from "../components/NftLink";
import Pagination from "../components/Pagination";
import {
  PAGED_TAGS_BY_HASHTAG,
  HASHTAGS_BY_NAME,
  ALL_TAGS_BY_HASHTAG,
} from "../queries";
import TimestampFrom from "../components/TimestampFrom";
import TimestampFormatted from "../components/TimestampFormatted";

const PAGE_SIZE = 10;

export default {
  name: "HashtagDetail",
  components: {
    TimestampFormatted,
    TimestampFrom,
    EthAccount,
    MarkdownDoc,
    NftLink,
    Footer,
    HashtagTokenId,
    Header,
    HelpModal,
    Pagination,
  },
  data() {
    let routeHashtag = this.$route.params.hashtag;
    routeHashtag = routeHashtag.replace("#", "");
    routeHashtag = routeHashtag.toLowerCase();

    return {
      activeTab: null,
      erc721: "http://erc721.org",
      hashtag: routeHashtag,
      hashtagsByName: null,
      isOverviewModalActive: false,
      isSummaryModalActive: false,
      isTaggedModalActive: false,
      tagsByHashtag: null,
      first: PAGE_SIZE,
      skip: 0,
      tagsCount: 0,
      pageSize: PAGE_SIZE,
    };
  },
  apollo: {
    tagsByHashtag: {
      query: PAGED_TAGS_BY_HASHTAG,
      variables() {
        return {
          hashtag: this.hashtag,
          first: this.first,
          skip: this.skip,
        };
      },
      pollInterval: 1000, // ms
    },
    tagsByHashtagCount: {
      query: ALL_TAGS_BY_HASHTAG,
      variables() {
        return {
          hashtag: this.hashtag,
        };
      },
      manual: true,
      result({ data }) {
        this.tagsCount = data.allTagsByHashtag.length;
      },
      pollInterval: 1000, // ms
    },
    hashtagsByName: {
      query: HASHTAGS_BY_NAME,
      variables() {
        return {
          name: this.hashtag,
        };
      },
      pollInterval: 1000, // ms
    },
  },
  methods: {
    tabSelected(id) {
      this.skip = id * PAGE_SIZE;
    },
  },
};
</script>

<style lang="scss"></style>
