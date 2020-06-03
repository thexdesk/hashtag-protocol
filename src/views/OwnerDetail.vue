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
          Owner: <eth-account :value="owner"></eth-account>
        </h1>
        <h2 class="subtitle">Hashtag Protocol Token Owner</h2>
        <div class="tile is-ancestor">
          <div class="tile is-horizontal">
            <div class="tile is-parent is-6 is-12-mobile">
              <div class="tile is-child box">
                <help-modal
                  modal="isOverviewModalActive"
                  @popModalFromChild="popModal"
                  class="is-pulled-right"
                ></help-modal>
                <h2 class="title is-4">Owner summary</h2>
                <div class="b-table">
                  <div class="table-wrapper">
                    <table class="table">
                      <tbody>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Owner address</td>
                          <td>
                            <eth-account :value="owner"></eth-account>
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Hashtags</td>
                          <td>
                            322
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Hashtag revenue</td>
                          <td>
                            1.361 ETH
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Tagged content</td>
                          <td>
                            1121
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Tagging revenue</td>
                          <td>
                            0.191 ETH
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Total revenue</td>
                          <td>
                            1.553 ETH
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
              <b-tooltip
                label="Help"
                position="is-bottom is-pulled-right"
                type="is-dark"
              >
                <button
                  class="button is-white"
                  @click="isTaggedModalActive = true"
                >
                  <b-icon icon="help-circle-outline" type="is-dark"> </b-icon>
                </button>
              </b-tooltip>
              <h2 class="title is-4 is-spaced">
                Activity for <eth-account :value="owner"></eth-account>
              </h2>
              <b-tabs v-model="activeTab" :animated="false">
                <b-tab-item label="Hashtags">
                  <div class="b-table">
                    <!---->
                    <!---->
                    <div class="table-wrapper has-mobile-cards">
                      <table class="table">
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
                                Publisher
                                <!---->
                              </div>
                            </th>
                          </tr>
                          <!---->
                          <!---->
                        </thead>
                        <tbody>
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="Hashtag" class="">
                              <span
                                ><a href="/hashtag/genesis" class="">
                                  #genesis
                                </a></span
                              >
                            </td>
                            <td data-label="Created" class="">11 hours ago</td>
                            <td data-label="Owner" class="">
                              <span>
                                0x40 ... ab5f
                              </span>
                            </td>
                            <td data-label="Owner" class="">
                              <span>
                                0x40 ... ab5f
                              </span>
                            </td>
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="Hashtag" class="">
                              <span
                                ><a href="/hashtag/SharkWeek" class="">
                                  #SharkWeek
                                </a></span
                              >
                            </td>
                            <td data-label="Created" class="">7 days ago</td>
                            <td data-label="Owner" class="">
                              <span>
                                0x07 ... 5b0e
                              </span>
                            </td>
                            <td data-label="Owner" class="">
                              <span>
                                0x40 ... ab5f
                              </span>
                            </td>
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="Hashtag" class="">
                              <span
                                ><a href="/hashtag/Micha3l" class="">
                                  #Micha3l
                                </a></span
                              >
                            </td>
                            <td data-label="Created" class="">11 days ago</td>
                            <td data-label="Owner" class="">
                              <span>
                                0x12 ... e4c2
                              </span>
                            </td>
                            <td data-label="Owner" class="">
                              <span>
                                0x40 ... ab5f
                              </span>
                            </td>
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="Hashtag" class="">
                              <span
                                ><a href="/hashtag/James" class="">
                                  #James
                                </a></span
                              >
                            </td>
                            <td data-label="Created" class="">14 days ago</td>
                            <td data-label="Owner" class="">
                              <span>
                                0x12 ... e4c2
                              </span>
                            </td>
                            <td data-label="Owner" class="">
                              <span>
                                0x40 ... ab5f
                              </span>
                            </td>
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="Hashtag" class="">
                              <span
                                ><a href="/hashtag/AmaZ3" class="">
                                  #AmaZ3
                                </a></span
                              >
                            </td>
                            <td data-label="Created" class="">14 days ago</td>
                            <td data-label="Owner" class="">
                              <span>
                                0x12 ... e4c2
                              </span>
                            </td>
                            <td data-label="Owner" class="">
                              <span>
                                0x40 ... ab5f
                              </span>
                            </td>
                          </tr>
                          <!---->
                          <!---->
                        </tbody>
                        <!---->
                      </table>
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
                                  ><i
                                    class="mdi mdi-chevron-left mdi-24px"
                                  ></i></span
                              ></a>
                              <a
                                role="button"
                                href="#"
                                aria-label="Page 2."
                                class="pagination-link pagination-next"
                                ><span class="icon" aria-hidden="true"
                                  ><i
                                    class="mdi mdi-chevron-right mdi-24px"
                                  ></i></span
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
                                <li>
                                  <span class="pagination-ellipsis">…</span>
                                </li>
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
                    </div>
                    <!---->
                  </div>
                </b-tab-item>
                <b-tab-item label="Tagged content">
                  <div class="b-table">
                    <!---->
                    <!---->
                    <div class="table-wrapper has-mobile-cards">
                      <table class="table">
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
                                Tagger
                                <!---->
                              </div>
                            </th>
                          </tr>
                          <!---->
                          <!---->
                        </thead>
                        <tbody>
                          <tr>
                            <td data-label="" class="">
                              <img
                                src="https://ipfs.infura.io/ipfs/QmdkqXoVfY8icbqK9BGS9EdMtJXzpPfR5BWeYC4DTu9EtJ"
                                style="max-width: 75px; max-height: 75px;"
                              />
                            </td>
                            <td data-label="Asset Name" class="">
                              Nr. 111 - The Pit
                            </td>
                            <td data-label="Hashtag" class="">
                              #SharkWeek
                            </td>
                            <td data-label="Tagged" class="">
                              2 days ago
                            </td>
                            <td data-label="Tagger" class="">0x40 ... ab5f</td>
                          </tr>
                        </tbody>
                        <!---->
                      </table>
                    </div>
                    <!---->
                  </div>
                </b-tab-item>
              </b-tabs>
            </article>
          </div>
        </div>
      </div>
      <b-modal :active.sync="isOverviewModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Owner summary</p>
              </div>
            </div>
            <div class="content">
              <p>
                <strong>Owner address</strong> - An Ethereum address that owns
                one or more Hasthag Protocol tokens.
              </p>
              <p>
                <strong>Hashtags</strong> - Current number of hashtags owned.
              </p>
              <p>
                <strong>Hashtag revenue</strong> - Total revenue for hashtags
                sold.
              </p>
              <p>
                <strong>Tagged content</strong> - Number of content items tagged
                with this owner's hashtags.
              </p>
              <p>
                <strong>Tagging revenue</strong> - Revenue from content tagged
                with this owner's hashtags.
              </p>
              <p>
                <strong>Total revenue</strong> - Total Hashtag Protocol revenue
                for this owner.
              </p>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal :active.sync="isTaggedModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Owner activity</p>
              </div>
            </div>
            <div class="content">
              <p>
                <strong>Hashtags</strong><br />Listing of hashtags owned by this
                address.
              </p>
              <ul>
                <li>
                  <strong>Created</strong> - Date token was created and added to
                  Ethereum blockchain.
                </li>
                <li>
                  <strong>Publisher</strong> - Ethereum address of application
                  implementing Hashtag Protocol where token was created. This
                  address receives a share of token creation fee paid for by the
                  token Creator.
                </li>
              </ul>
              <p>
                <strong>Tagged content</strong><br />Listing of content tagged
                with hashtags owned by this address. Protocol currently supports
                tagging other ERC-721 tokens.
              </p>
              <ul>
                <li>
                  <strong>Asset name</strong> - Name of the ERC-721 token.
                </li>
                <li>
                  <strong>Hashtag</strong> - Hashtag asset is tagged with.
                </li>
                <li><strong>Tagged</strong> - Date asset was tagged.</li>
                <li>
                  <strong>Tagger</strong> - Ethereum address used to pay tagging
                  fee.
                </li>
              </ul>
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
import Header from "../components/Header";
import HelpModal from "../components/HelpModal";
//import { TAGS_BY_HASHTAG, HASHTAGS_BY_NAME } from "../queries";

export default {
  name: "OwnerDetail",
  components: {
    EthAccount,
    Footer,
    Header,
    HelpModal,
  },
  data() {
    return {
      activeTab: null,
      isOverviewModalActive: false,
      isSummaryModalActive: false,
      isTaggedModalActive: false,
      owner: this.$route.params.address,
      tagsByHashtag: null,
      hashtagsByName: null,
    };
  },
};
</script>

<style lang="scss"></style>
