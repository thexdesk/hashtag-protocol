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
        <h1 class="title is-1">Hashtags</h1>
        <h2 class="subtitle">
          Hashtag Protocol Tokens
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
                modal="isOverviewModalActive"
                @popModalFromChild="popModal"
                class="is-pulled-right"
              ></help-modal>
              <h2 class="title is-4 is-spaced"></h2>
              <div class="b-table">
                <!---->
                <!---->
                <div class="table-wrapper has-mobile-cards">
                  <table tabindex="0" class="table is-hoverable">
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
                            Owner
                            <!---->
                          </div>
                        </th>
                        <th class="">
                          <div class="th-wrap">
                            Publisher
                            <!---->
                          </div>
                        </th>
                        <th class="">
                          <div class="th-wrap">
                            Tag count
                            <!---->
                          </div>
                        </th>
                        <!---->
                      </tr>
                      <!---->
                      <!---->
                    </thead>
                    <tbody v-if="pagedHashtags">
                      <tr
                        draggable="false"
                        class=""
                        v-for="hashtag in pagedHashtags"
                        v-bind:key="hashtag.id"
                      >
                        <!---->
                        <!---->
                        <td data-label="Hashtag" class="">
                          <hashtag :value="hashtag.displayHashtag"></hashtag>
                        </td>
                        <td data-label="Minted" class="">
                          <timestamp-from
                            :value="hashtag.timestamp"
                          ></timestamp-from>
                        </td>
                        <td data-label="Owner" class="">
                          <eth-account :value="hashtag.creator"></eth-account>
                        </td>
                        <td data-label="Owner" class="">Pending Auction</td>
                        <td data-label="Publisher" class="">
                          <eth-account :value="hashtag.publisher"></eth-account>
                        </td>
                        <td data-label="Count" class="">
                          {{ hashtag.tagCount }}
                        </td>
                        <!---->
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!---->
              </div>
              <Pagination
                :entity-count="hashtagCount"
                :page-size="pageSize"
                @tabSelected="tabSelected"
              />
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
                filename="hashtags-list-overview"
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
import Pagination from "../components/Pagination";
import TimestampFrom from "../components/TimestampFrom";
import { PAGED_HASHTAGS, ALL_HASHTAG_TOKEN_IDS } from "../queries";

const PAGE_SIZE = 10;

export default {
  name: "Nfts",
  components: {
    EthAccount,
    TimestampFrom,
    Hashtag,
    Footer,
    Header,
    HelpModal,
    MarkdownDoc,
    Pagination,
  },
  data() {
    return {
      activeTab: null,
      isOverviewModalActive: false,
      pageSize: PAGE_SIZE,
      first: PAGE_SIZE,
      skip: 0,
      hashtagCount: 0,
    };
  },
  apollo: {
    pagedHashtags: {
      query: PAGED_HASHTAGS,
      variables() {
        return {
          first: this.first,
          skip: this.skip,
        };
      },
    },
    hashtagCount: {
      query: ALL_HASHTAG_TOKEN_IDS,
      manual: true,
      result({ data }) {
        this.hashtagCount = data.hashtags.length;
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
