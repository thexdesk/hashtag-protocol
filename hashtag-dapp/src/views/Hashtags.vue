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
        <h1 class="title is-1">Hashtags ({{ hashtagCount }})</h1>
        <h2 class="subtitle">Hashtag Protocol Tokens</h2>
        <div class="columns is-tablet is-centered">
          <div class="column is-12">
            <article class="is-white box">
              <help-modal
                modal="isRecentlyTaggedModalActive"
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
                          <eth-account :value="hashtag.owner"></eth-account>
                        </td>
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
              <div class="level">
                <div class="level-left"></div>
                <div class="level-right">
                  <div class="level-item">
                    <nav class="pagination">
                      <b-button
                        role="button"
                        :disabled="currentPage === 0"
                        @click="previousPage"
                        class="pagination-link pagination-previous"
                        ><span class="icon" aria-hidden="true"
                          ><i class="mdi mdi-chevron-left mdi-24px"></i></span
                      ></b-button>
                      <b-button
                        role="button"
                        :disabled="
                          currentPage === Math.ceil(hashtagCount / pageSize) - 1
                        "
                        @click="nextPage"
                        class="pagination-link pagination-next"
                        ><span class="icon" aria-hidden="true"
                          ><i class="mdi mdi-chevron-right mdi-24px"></i></span
                      ></b-button>
                      <ul class="pagination-list">
                        <li
                          v-for="(page, idx) in Array.from(
                            { length: Math.ceil(hashtagCount / this.first) },
                            (v, k) => k
                          )"
                          :key="idx"
                          @click="tabSelected(page)"
                        >
                          <b-button
                            role="button"
                            class="pagination-link"
                            v-bind:class="{
                              'is-current': currentPage === page,
                            }"
                            >{{ page + 1 }}</b-button
                          >
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Header from "../components/Header";
import HelpModal from "../components/HelpModal";
import { PAGED_HASHTAGS, ALL_HASHTAG_TOKEN_IDS } from "../queries";
import Hashtag from "../components/Hashtag";
import TimestampFrom from "../components/TimestampFrom";
import EthAccount from "../components/EthAccount";

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
  },
  data() {
    return {
      activeTab: null,
      isRecentlyTaggedModalActive: false,
      pageSize: PAGE_SIZE,
      first: PAGE_SIZE,
      skip: 0,
      hashtagCount: 0,
      currentPage: 0,
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
    nextPage() {
      this.tabSelected(this.currentPage + 1);
    },
    previousPage() {
      this.tabSelected(this.currentPage - 1);
    },
    tabSelected(id) {
      this.skip = id * PAGE_SIZE;
      this.currentPage = id;
    },
  },
};
</script>

<style lang="scss"></style>
