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
        <h1 class="title is-1">Publisher: {{ publisher }}</h1>
        <h2 class="subtitle">Hashtag Protocol Publisher</h2>
        <div class="tile is-ancestor">
          <div class="tile is-horizontal">
            <div class="tile is-parent is-6 is-12-mobile">
              <div class="tile is-child box">
                <b-tooltip
                  label="Help"
                  position="is-bottom is-pulled-right"
                  type="is-dark"
                >
                  <button
                    class="button is-white"
                    @click="isOverviewModalActive = true"
                  >
                    <b-icon icon="help-circle-outline" type="is-dark"> </b-icon>
                  </button>
                </b-tooltip>
                <h2 class="title is-4">Publisher information</h2>
                <div class="b-table">
                  <div class="table-wrapper">
                    <table class="table">
                      <tbody>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Publisher</td>
                          <td>
                            KnownOrigin
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Wallet address</td>
                          <td>
                            0x7c00c9f0e7aed440c0c730a9bd9ee4f49de20d5c
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Official site</td>
                          <td>
                            <a href="https://knownorigin.io/"
                              >https://knownorigin.io
                              <b-icon icon="open-in-new" size="is-small"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="tile is-parent is-6 is-12-mobile">
              <div class="tile is-child box">
                <b-tooltip
                  label="Help"
                  position="is-bottom is-pulled-right"
                  type="is-dark"
                >
                  <button
                    class="button is-white is-pulled-right"
                    @click="isSummaryModalActive = true"
                  >
                    <b-icon icon="help-circle-outline" type="is-dark"> </b-icon>
                  </button>
                </b-tooltip>
                <h2 class="title is-4">Activity summary</h2>
                <div class="b-table">
                  <div class="table-wrapper">
                    <table class="table">
                      <tbody>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Hashtags minted</td>
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
                Recent activity for KnownOrigin
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
                                Minted
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
                                Revenue
                                <!---->
                              </div>
                            </th>
                            <!---->
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
                            <td data-label="Minted" class="">11 hours ago</td>
                            <td data-label="Owner" class="">
                              <b-tooltip
                                label="Help"
                                position="is-bottom"
                                type="is-dark"
                              >
                                <span>
                                  0x40 ... ab5f
                                </span>
                              </b-tooltip>
                            </td>
                            <td data-label="Publisher" class="">
                              <span>
                                0.25 ETH
                              </span>
                            </td>
                            <!---->
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
                            <td data-label="Minted" class="">7 days ago</td>
                            <td data-label="Owner" class="">
                              <span>
                                0x07 ... 5b0e
                              </span>
                            </td>
                            <td data-label="Publisher" class="">
                              <span>
                                0.25 ETH
                              </span>
                            </td>
                            <!---->
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
                            <td data-label="Minted" class="">11 days ago</td>
                            <td data-label="Owner" class="">
                              <span>
                                0x12 ... e4c2
                              </span>
                            </td>
                            <td data-label="Publisher" class="">
                              <span>
                                0.25 ETH
                              </span>
                            </td>
                            <!---->
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
                            <td data-label="Minted" class="">14 days ago</td>
                            <td data-label="Owner" class="">
                              <span>
                                0x12 ... e4c2
                              </span>
                            </td>
                            <td data-label="Publisher" class="">
                              <span>
                                0.25 ETH
                              </span>
                            </td>
                            <!---->
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
                            <td data-label="Minted" class="">14 days ago</td>
                            <td data-label="Owner" class="">
                              <span>
                                0x12 ... e4c2
                              </span>
                            </td>
                            <td data-label="Publisher" class="">
                              <span>
                                0.25 ETH
                              </span>
                            </td>
                            <!---->
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
                            <th class="">
                              <div class="th-wrap">
                                Revenue
                                <!---->
                              </div>
                            </th>
                            <!---->
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
                            <td data-label="Revenue" class="">0.001 ETH</td>
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
                <p class="title is-4">Token overview explained</p>
              </div>
            </div>
            <div class="content">
              <p>
                <strong>Minted</strong> - Date token was created and added to
                Ethereum blockchain.
              </p>
              <p>
                <strong>Publisher</strong> - Wallet address of application
                running Hashtag Protocol where token was minted. This address
                receives share of token minting fees.
              </p>
              <p>
                <strong>Creator</strong> - Wallet address that payed the token
                minting fee.
              </p>
              <p>
                <strong>Owner</strong> - Wallet address of current token owner.
                This address receives share of content tagging fees.
              </p>
              <p>
                <strong>Expires</strong> - Date from which
                <strong>Owner</strong> has 30 days to renew token ownership
                without cost. This is done by sending a transaction to the token
                contract signed by the current owner address. If token is not
                renewed within 30 days, ownership is transferred to the Protocol
                wallet address.
              </p>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal :active.sync="isSummaryModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Revenue summary explained</p>
              </div>
            </div>
            <div class="content">
              <p>
                Stitched into the design of the Hashtag Protocol is a virtuous
                incentive structure that rewards all participants of the system.
              </p>
              <p>
                <strong>Mint price</strong> - Hashtag Protocol uses a fair
                auction method to determine the price of a new Hashtag token.
                The mint price is the amount the winning bidder pays to acquire
                the newly minted Hashtag Token. The proceeds of the auction are
                automatically divided between the Publisher and the Protocol.
              </p>
              <p></p>
              <p>
                <strong>Earnings</strong> - When a digital artifact is tagged
                with a Hashtag token, the Tagger pays a small fee added to the
                standard Ethereum network gas fee. This fee is automatically
                divided among the Hastag Token owner, the originating Publisher
                and the Protocol. The summary shown here represents the lifetime
                sum total of tagging revenue distributed to the Owner, Publisher
                & Protocol for this Hashtag token.
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
                <p class="title is-4">Tagged content explained</p>
              </div>
            </div>
            <div class="content">
              <p>
                Stitched into the design of the Hashtag Protocol is a virtuous
                incentive structure that rewards all participants of the system.
              </p>
              <p>
                <strong>Mint price</strong> - Hashtag Protocol uses a fair
                auction method to determine the price of a new Hashtag token.
                The mint price is the amount the winning bidder pays to acquire
                the newly minted Hashtag Token. The proceeds of the auction are
                automatically divided between the Publisher and the Protocol.
              </p>
              <p></p>
              <p>
                <strong>Earnings</strong> - When a digital artifact is tagged
                with a Hashtag token, the Tagger pays a small fee added to the
                standard Ethereum network gas fee. This fee is automatically
                divided among the Hastag Token owner, the originating Publisher
                and the Protocol. The summary shown here represents the lifetime
                sum total of tagging revenue distributed to the Owner, Publisher
                & Protocol for this Hashtag token.
              </p>
            </div>
          </div>
        </div>
      </b-modal>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Header from "../components/Header";
//import { TAGS_BY_HASHTAG, HASHTAGS_BY_NAME } from "../queries";
//import EthAccount from "../components/EthAccount";

export default {
  name: "PublisherDetail",
  components: {
    //EthAccount,
    Footer,
    Header,
  },
  data() {
    return {
      activeTab: null,
      isOverviewModalActive: false,
      isSummaryModalActive: false,
      isTaggedModalActive: false,
      publisher: this.$route.params.publisher,
      tagsByHashtag: null,
      hashtagsByName: null,
    };
  },
};
</script>

<style lang="scss"></style>
