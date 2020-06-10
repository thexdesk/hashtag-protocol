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
        <h1 class="title is-1">Publishers</h1>
        <h2 class="subtitle">Hashtag Protocol Publishers</h2>
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
                            Earnings
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
                          <eth-account :value="publisher.id"></eth-account>
                        </td>
                        <td data-label="Hashtags" class="has-text-centered">
                          {{ publisher.mintCount }}
                        </td>
                        <td data-label="Tag count" class="has-text-centered">
                          {{ publisher.tagCount }}
                        </td>
                        <td data-label="Earnings" class="has-text-centered">
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
              <div class="level">
                <div class="level-left"></div>
                <div class="level-right">
                  <div class="level-item">
                    <nav class="pagination">
                      <a
                        role="button"
                        href="#"
                        disabled="disabled"
                        aria-label="Page 0."
                        class="pagination-link pagination-previous"
                        ><span class="icon" aria-hidden="true"
                          ><i class="mdi mdi-chevron-left mdi-24px"></i></span
                      ></a>
                      <a
                        role="button"
                        href="#"
                        aria-label="Page 2."
                        class="pagination-link pagination-next"
                        ><span class="icon" aria-hidden="true"
                          ><i class="mdi mdi-chevron-right mdi-24px"></i></span
                      ></a>
                      <ul class="pagination-list">
                        <!---->
                        <!---->
                        <li>
                          <a
                            role="button"
                            href="#"
                            aria-label="Current page, Page 1."
                            aria-current="true"
                            class="pagination-link is-current"
                            >1</a
                          >
                        </li>
                        <li>
                          <a
                            role="button"
                            href="#"
                            aria-label="Page 2."
                            class="pagination-link"
                            >2</a
                          >
                        </li>
                        <li><span class="pagination-ellipsis">…</span></li>
                        <li>
                          <a
                            role="button"
                            href="#"
                            aria-label="Page 12."
                            class="pagination-link"
                            >12</a
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
import { PAGED_PUBLISHERS } from "../queries";
import EthAccount from "../components/EthAccount";
import EthAmountSum from "../components/EthAmountSum";

export default {
  name: "Nfts",
  components: {
    EthAmountSum,
    EthAccount,
    Footer,
    Header,
    HelpModal,
  },
  data() {
    return {
      activeTab: null,
      isRecentlyTaggedModalActive: false,
      first: 10,
      skip: 0,
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
  },
};
</script>

<style lang="scss"></style>
