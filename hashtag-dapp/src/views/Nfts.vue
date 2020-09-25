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
        <h1 class="title is-1">
          Tagged NFTs
        </h1>
        <h2 class="subtitle">
          Content tagged using Hashtag Tokens
          <span class="is-pulled-right is-size-6 has-text-weight-bold">
            <router-link :to="{ name: 'dashboard' }">Dashboard</router-link
            >&nbsp;
            <b-icon icon="arrow-up" type="is-dark" size="is-small"></b-icon>
          </span>
        </h2>
        <div class="columns is-tablet is-centered">
          <div class="column is-12">
            <article class="is-white box">
              <help-modal
                modal="isTaggedAssetsModalActive"
                @popModalFromChild="popModal"
                class="is-pulled-right"
              ></help-modal>
              <h2 class="title is-4 is-spaced"></h2>
              <div class="b-table">
                <div class="table-wrapper has-mobile-cards">
                  <table tabindex="0" class="table is-hoverable">
                    <thead>
                      <tr>
                        <th class="">
                          <div class="th-wrap"></div>
                        </th>
                        <th class="">
                          <div class="th-wrap">
                            Asset Name
                          </div>
                        </th>
                        <th class="">
                          <div class="th-wrap">
                            Project
                          </div>
                        </th>
                        <th class="">
                          <div class="th-wrap">
                            Hashtag
                          </div>
                        </th>
                        <th class="">
                          <div class="th-wrap">
                            Tagged
                          </div>
                        </th>
                        <th class="">
                          <div class="th-wrap">
                            Publisher
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody v-if="pagedTags">
                      <tr
                        draggable="false"
                        class=""
                        v-for="tag in pagedTags"
                        v-bind:key="tag.id"
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
                        <td data-label="Asset Name" class="">
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
                        <td data-label="Hashtag" class="">
                          <hashtag :value="tag.hashtagName"></hashtag>
                        </td>
                        <td>
                          <timestamp-from
                            :value="tag.timestamp"
                          ></timestamp-from>
                        </td>
                        <td>
                          <eth-account
                            :value="tag.publisher"
                            route="publisher-detail"
                          ></eth-account>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <Pagination
                :entity-count="tagsCount"
                :page-size="pageSize"
                @tabSelected="tabSelected"
              />
            </article>
          </div>
        </div>
      </div>
      <b-modal
        :active.sync="isTaggedAssetsModalActive"
        :width="640"
        scroll="keep"
      >
        <div class="card">
          <div class="card-content">
            <div class="content">
              <markdown-doc
                doc-type="help"
                filename="tagged-asset-list-overview"
              ></markdown-doc>
              <b-collapse
                :open="false"
                position="is-top"
                aria-id="contentIdForA11y1"
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
                      ? 'What is "tagged content"?'
                      : 'What is "tagged content"?'
                  }}
                </a>
                <markdown-doc
                  doc-type="faq"
                  filename="what-is-tagged-content"
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
import Hashtag from "../components/Hashtag";
import Header from "../components/Header";
import HelpModal from "../components/HelpModal";
import MarkdownDoc from "../components/MarkdownDoc";
import NftLink from "../components/NftLink";
import Pagination from "../components/Pagination";
import TimestampFrom from "../components/TimestampFrom";
import { PAGED_TAGS, ALL_TAG_IDS } from "../queries";

const PAGE_SIZE = 10;

export default {
  name: "Nfts",
  components: {
    EthAccount,
    Footer,
    Hashtag,
    Header,
    HelpModal,
    MarkdownDoc,
    NftLink,
    Pagination,
    TimestampFrom,
  },
  data() {
    return {
      activeTab: null,
      isTaggedAssetsModalActive: false,
      pageSize: PAGE_SIZE,
      first: PAGE_SIZE,
      skip: 0,
      tagsCount: 0,
    };
  },
  apollo: {
    pagedTags: {
      query: PAGED_TAGS,
      variables() {
        return {
          first: this.first,
          skip: this.skip,
        };
      },
    },
    tagsCount: {
      query: ALL_TAG_IDS,
      manual: true,
      result({ data }) {
        this.tagsCount = data.tags.length;
      },
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
