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
        <h1 class="title is-1">#{{ hashtag }}</h1>
        <h2 class="subtitle">Hashtag Protocol Token</h2>
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
                <h2 class="title is-4">Token overview</h2>
                <div class="b-table" v-if="hashtagsByName">
                  <div class="table-wrapper">
                    <table class="table">
                      <tbody>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Minted</td>
                          <td>
                            {{
                              new Date(hashtagsByName[0].timestamp * 1000)
                                | moment("MMM Do YYYY")
                            }}
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Tag Count</td>
                          <td>
                            {{ hashtagsByName[0].tagCount }}
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Publisher</td>
                          <td>
                            <eth-account
                              :value="hashtagsByName[0].publisher"
                            ></eth-account>
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Creator</td>
                          <td>
                            <eth-account
                              :value="hashtagsByName[0].owner"
                            ></eth-account>
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Owner</td>
                          <td>
                            <eth-account
                              :value="hashtagsByName[0].owner"
                            ></eth-account>
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Expires</td>
                          <td>
                            {{
                              new Date(
                                (parseInt(hashtagsByName[0].timestamp) +
                                  63113904) *
                                  1000
                              ) | moment("MMM Do YYYY")
                            }}
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
                <h2 class="title is-4">Revenue summary</h2>
                <div class="b-table">
                  <div class="table-wrapper">
                    <table class="table">
                      <tbody>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Mint price</td>
                          <td>
                            0.8265 ETH<br />0.57855 to Publisher<br />0.24795 to
                            Protocol
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Earnings</td>
                          <td>
                            0.001 Owner<br />0.001 Publisher<br />0.001 Protocol
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
                Content tagged with #{{ hashtag }}
              </h2>
              <b-tabs v-model="activeTab" :animated="true">
                <b-tab-item label="ERC-721 NFTs">
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
                                Project
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
                                Publisher
                                <!---->
                              </div>
                            </th>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                        </thead>
                        <tbody v-if="tagsByHashtag">
                          <tr
                            v-for="tag in tagsByHashtag"
                            v-bind:key="tag.id"
                            draggable="false"
                            class=""
                          >
                            <td data-label="" class="">
                              <img
                                :src="tag.nftImage"
                                style="max-width: 75px; max-height: 75px;"
                              />
                            </td>
                            <td data-label="Asset Name" class="">
                              {{ tag.nftName }}
                            </td>
                            <td data-label="Project" class="">
                              {{ tag.nftContractName }}
                            </td>
                            <td data-label="Tagged" class="">
                              <time>
                                {{
                                  new Date(tag.timestamp * 1000)
                                    | moment("from")
                                }}
                              </time>
                            </td>
                            <td data-label="Tagger" class="">
                              <eth-account :value="tag.tagger"></eth-account>
                            </td>
                            <td data-label="Publisher" class="">
                              <eth-account :value="tag.publisher"></eth-account>
                            </td>
                          </tr>
                        </tbody>
                        <!---->
                      </table>
                    </div>
                    <!---->
                  </div>
                </b-tab-item>
                <b-tab-item label="IPFS" :disabled="true">
                  Coming soon...
                </b-tab-item>
                <b-tab-item label="Unstoppable domains" :disabled="true">
                  Coming soon...
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
import { TAGS_BY_HASHTAG, HASHTAGS_BY_NAME } from "../queries";
import EthAccount from "../components/EthAccount";

export default {
  name: "HashtagDetail",
  components: {
    EthAccount,
    Footer,
    Header,
  },
  data() {
    return {
      activeTab: null,
      isOverviewModalActive: false,
      isSummaryModalActive: false,
      isTaggedModalActive: false,
      hashtag: this.$route.params.hashtag,
      tagsByHashtag: null,
      hashtagsByName: null,
    };
  },
  apollo: {
    tagsByHashtag: {
      query: TAGS_BY_HASHTAG,
      variables() {
        return {
          hashtag: this.hashtag && this.hashtag.toLowerCase(),
        };
      },
      pollInterval: 1000, // ms
    },
    hashtagsByName: {
      query: HASHTAGS_BY_NAME,
      variables() {
        return {
          name: this.hashtag && this.hashtag.toLowerCase(),
        };
      },
      pollInterval: 1000, // ms
    },
  },
};
</script>

<style lang="scss"></style>
