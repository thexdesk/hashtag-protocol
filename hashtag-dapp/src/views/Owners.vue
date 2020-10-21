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
        <h1 class="title is-1">Owners</h1>
        <h2 class="subtitle">
          Hashtag Protocol Token Owners
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
                            Owner
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
                    <tbody v-if="pagedOwners">
                      <tr
                        draggable="false"
                        class=""
                        v-for="owner in pagedOwners"
                        v-bind:key="owner.id"
                      >
                        <!---->
                        <!---->
                        <td data-label="Owner" class="">
                          <eth-account
                            :value="owner.id"
                            route="owner-detail"
                          ></eth-account>
                        </td>
                        <td data-label="Hashtags" class="has-text-centered">
                          {{ owner.mintCount }}
                        </td>
                        <td data-label="Tag count" class="has-text-centered">
                          {{ owner.tagCount }}
                        </td>
                        <td data-label="Revenue" class="has-text-centered">
                          <eth-amount :value="owner.tagFees"></eth-amount>
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
                :entity-count="ownersCount"
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
                filename="owners-list-overview"
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
                    !props.open ? 'What\'s an "Owner"?' : 'What\'s an "Owner"?'
                  }}
                </a>
                <markdown-doc
                  doc-type="faq"
                  filename="050-what-is-an-owner"
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
import EthAmount from "../components/EthAmount";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HelpModal from "../components/HelpModal";
import MarkdownDoc from "../components/MarkdownDoc";
import Pagination from "../components/Pagination";
import { PAGED_OWNERS, ALL_OWNER_ADDRESSES } from "../queries";

const PAGE_SIZE = 10;

export default {
  name: "Nfts",
  components: {
    EthAmount,
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
      ownersCount: 0,
    };
  },
  apollo: {
    pagedOwners: {
      query: PAGED_OWNERS,
      variables() {
        return {
          first: this.first,
          skip: this.skip,
        };
      },
    },
    ownersCount: {
      query: ALL_OWNER_ADDRESSES,
      manual: true,
      result({ data }) {
        this.ownersCount = data.owners.length;
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
