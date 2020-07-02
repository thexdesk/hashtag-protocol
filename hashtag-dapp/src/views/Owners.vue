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
        <h2 class="subtitle">Hashtag Protocol Token Owners</h2>
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
                            Earnings
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
                        <td data-label="Earnings" class="has-text-centered">
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
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Header from "../components/Header";
import HelpModal from "../components/HelpModal";
import { PAGED_OWNERS, ALL_OWNER_ADDRESSES } from "../queries";
import EthAccount from "../components/EthAccount";
import EthAmount from "../components/EthAmount";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 10;

export default {
  name: "Nfts",
  components: {
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
      isRecentlyTaggedModalActive: false,
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
