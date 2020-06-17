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
        <h1 class="title is-1">Taggers</h1>
        <h2 class="subtitle">Hashtag Protocol Taggers</h2>
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
                            Tagger
                            <!---->
                          </div>
                        </th>
                        <th class="">
                          <div class="th-wrap is-centered">
                            Tag count
                            <!---->
                          </div>
                        </th>
                        <!---->
                      </tr>
                      <!---->
                      <!---->
                    </thead>
                    <tbody v-if="pagedTaggers">
                      <tr
                        draggable="false"
                        class=""
                        v-for="tagger in pagedTaggers"
                        v-bind:key="tagger.id"
                      >
                        <!---->
                        <!---->
                        <td data-label="Tagger" class="">
                          <eth-account
                            :value="tagger.id"
                            route="tagger-detail"
                          ></eth-account>
                        </td>
                        <td data-label="Tag count" class="has-text-centered">
                          {{ tagger.tagCount }}
                        </td>
                        <!---->
                      </tr>
                      <!---->
                      <!---->
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
                          currentPage === Math.ceil(taggersCount / pageSize) - 1
                        "
                        @click="nextPage"
                        class="pagination-link pagination-next"
                        ><span class="icon" aria-hidden="true"
                          ><i class="mdi mdi-chevron-right mdi-24px"></i></span
                      ></b-button>
                      <ul class="pagination-list">
                        <li
                          v-for="(page, idx) in Array.from(
                            {
                              length: Math.ceil(taggersCount / pageSize),
                            },
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
import { PAGED_TAGGERS, ALL_TAGGERS } from "../queries";
import EthAccount from "../components/EthAccount";

const PAGE_SIZE = 10;

export default {
  name: "Nfts",
  components: {
    EthAccount,
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
      taggersCount: 0,
      currentPage: 0,
    };
  },
  apollo: {
    taggerCount: {
      query: ALL_TAGGERS,
      manual: true,
      result({ data }) {
        this.taggersCount = data.taggers.length;
      },
    },
    pagedTaggers: {
      query: PAGED_TAGGERS,
      variables() {
        return {
          first: this.first,
          skip: this.skip,
        };
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
