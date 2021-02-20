<template>
  <div class="body">
    <Header />
    <section class="main">
      <div class="container">
        <h1 class="title is-1">Publishers</h1>
        <h2 class="subtitle">
          Hashtag Protocol Publishers
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
                            Publisher
                            <!---->
                          </div>
                        </th>
                        <th class="">
                          <div class="th-wrap is-centered">
                            Hashtags
                            <!---->
                          </div>
                        </th>
                        <th class="">
                          <div class="th-wrap is-centered">
                            Tag count
                            <!---->
                          </div>
                        </th>
                        <th class="">
                          <div class="th-wrap is-centered">
                            Revenue
                            <!---->
                          </div>
                        </th>
                        <!---->
                      </tr>
                      <!---->
                      <!---->
                    </thead>
                    <tbody v-if="pagedPublishers">
                      <tr
                        draggable="false"
                        class=""
                        v-for="publisher in pagedPublishers"
                        v-bind:key="publisher.id"
                      >
                        <!---->
                        <!---->
                        <td data-label="Owner" class="">
                          <eth-account
                            :value="publisher.id"
                            route="publisher-detail"
                          ></eth-account>
                        </td>
                        <td data-label="Hashtags" class="has-text-centered">
                          {{ publisher.mintCount }}
                        </td>
                        <td data-label="Tag count" class="has-text-centered">
                          {{ publisher.tagCount }}
                        </td>
                        <td data-label="Revenue" class="has-text-centered">
                          <eth-amount-sum
                            :value1="publisher.mintFees"
                            :value2="publisher.tagFees"
                          ></eth-amount-sum>
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
              <Pagination
                :entity-count="publishersCount"
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
                filename="publishers-list-overview"
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
                      ? "What's a Hashtag Protocol Publisher?"
                      : "What's a Hashtag Protocol Publisher?"
                  }}
                </a>
                <markdown-doc
                  doc-type="faq"
                  filename="040-what-is-a-publisher"
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
import EthAmountSum from "../components/EthAmountSum";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HelpModal from "../components/HelpModal";
import MarkdownDoc from "../components/MarkdownDoc";
import Pagination from "../components/Pagination";
import { PAGED_PUBLISHERS, ALL_PUBLISHERS } from "../queries";

const PAGE_SIZE = 10;

export default {
  name: "Nfts",
  components: {
    EthAmountSum,
    EthAccount,
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
      publishersCount: 0,
    };
  },
  apollo: {
    pagedPublishers: {
      query: PAGED_PUBLISHERS,
      variables() {
        return {
          first: this.first,
          skip: this.skip,
        };
      },
    },
    publishersCount: {
      query: ALL_PUBLISHERS,
      manual: true,
      result({ data }) {
        this.publishersCount = data.publishers.length;
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
