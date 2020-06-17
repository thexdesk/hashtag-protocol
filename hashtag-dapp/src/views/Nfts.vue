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
        <h1 class="title is-1">Tagged NFTs</h1>
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
                            Publisher
                            <!---->
                          </div>
                        </th>
                        <!---->
                      </tr>
                      <!---->
                      <!---->
                    </thead>
                    <tbody v-if="pagedTags">
                      <tr
                        draggable="false"
                        class=""
                        v-for="tag in pagedTags"
                        v-bind:key="tag.id"
                      >
                        <!---->
                        <!---->
                        <td data-label="" class="">
                          <img
                            :src="tag.nftImage"
                            style="max-width: 75px; max-height: 75px;"
                          />
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
                        <!---->
                      </tr>
                      <!---->
                      <!---->
                    </tbody>
                    <!---->
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
                          currentPage === Math.ceil(tagsCount / pageSize) - 1
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
                              length: Math.ceil(tagsCount / pageSize),
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
import { PAGED_TAGS, ALL_TAG_IDS } from "../queries";
import Hashtag from "../components/Hashtag";
import TimestampFrom from "../components/TimestampFrom";
import EthAccount from "../components/EthAccount";
import NftLink from "../components/NftLink";

const PAGE_SIZE = 10;

export default {
  name: "Nfts",
  components: {
    NftLink,
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
      tagsCount: 0,
      currentPage: 0,
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
