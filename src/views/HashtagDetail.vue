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
        <h1 class="title is-1">#{{ hashtagsByName[0].displayHashtag }}</h1>
        <h2 class="subtitle">Hashtag Protocol Token</h2>
        <div class="tile is-ancestor">
          <div class="tile is-horizontal">
            <div class="tile is-parent is-6 is-12-mobile">
              <div class="tile is-child box">
                <help-modal
                  modal="isOverviewModalActive"
                  @popModalFromChild="popModal"
                  class="is-pulled-right"
                ></help-modal>
                <h2 class="title is-4">Token overview</h2>
                <div class="b-table" v-if="hashtagsByName">
                  <div class="table-wrapper">
                    <table class="table">
                      <tbody>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Token ID</td>
                          <td>
                            {{ hashtagsByName[0].id }}
                            <b-tooltip
                              label="view on Etherscan"
                              position="is-bottom"
                              type="is-dark"
                              size="is-small"
                            >
                              <a v-bind:href="hashtagsByName[0].id">
                                <b-icon
                                  icon="ethereum"
                                  type="is-dark"
                                  size="is-small"
                                >
                                </b-icon>
                              </a>
                            </b-tooltip>
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Created</td>
                          <td>
                            {{
                              new Date(hashtagsByName[0].timestamp * 1000)
                                | moment("MMM Do YYYY")
                            }}
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Publisher</td>
                          <td>
                            <eth-account
                              :value="hashtagsByName[0].publisher"
                              route="publisher-detail"
                            ></eth-account>
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Creator</td>
                          <td>
                            <eth-account
                              :value="hashtagsByName[0].owner"
                              route="owner-detail"
                            ></eth-account>
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Owner</td>
                          <td>
                            <eth-account
                              :value="hashtagsByName[0].owner"
                              route="owner-detail"
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
                <help-modal
                  modal="isSummaryModalActive"
                  @popModalFromChild="popModal"
                  class="is-pulled-right"
                ></help-modal>
                <h2 class="title is-4">Market summary</h2>
                <div class="b-table">
                  <div class="table-wrapper">
                    <table class="table">
                      <tbody>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Creation price</td>
                          <td>
                            0.8265 ETH<br />0.57855 to Publisher<br />0.24795 to
                            Protocol
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Tagged content</td>
                          <td>
                            {{ hashtagsByName[0].tagCount }}
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Tagging revenue</td>
                          <td>
                            0.000 Owner<br />0.000 Publisher<br />0.000 Protocol
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
              <help-modal
                modal="isTaggedModalActive"
                @popModalFromChild="popModal"
                class="is-pulled-right"
              ></help-modal>
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
                <p class="title is-4">Token overview</p>
              </div>
            </div>
            <div class="content">
              <p>
                Hashtags in the Hashtag Protocol are contained within
                <a v-bind:href="erc721"
                  >ERC-721 cryptographic tokens
                  <b-icon icon="open-in-new" size="is-small"> </b-icon
                ></a>
                recorded on the Ethereum blockchain. Hashtag Protocol tokens are
                created by (human or machine) implementing the mint() method in
                a smart contract provided by Protocol. ERC-721 tokens differ
                from the more common ERC-20 tokens with the key difference being
                that ERC-721 tokens are “non-fungible”. This means that each
                token is unique and as a result, not interchangeable. This
                property makes them ideally suited to represent hashtags. In
                addition, each ERC-721 has one owner and can be bought or sold.
                These properties make ideally suited for treating Hashtags as
                digital assets that can be created and openly bought and sold.
              </p>
              <p>
                <strong>Token ID</strong> - Numerical Id for this token on the
                Ethereum blockchain.
              </p>
              <p>
                <strong>Created</strong> - Date this token was created and added
                to Ethereum blockchain.
              </p>
              <p>
                <strong>Publisher</strong> - Ethereum address of application
                implementing Hashtag Protocol where this token was created. This
                address receives a share of token creation fee.
              </p>
              <p>
                <strong>Creator</strong> - Ethereum address that payed the token
                creation fee.
              </p>
              <p>
                <strong>Owner</strong> - Ethereum address of current token
                owner. This address receives a share of content tagging fee.
              </p>
              <p>
                <strong>Expires</strong> - Date from which
                <strong>Owner</strong> has 30 days to renew token ownership.
                This is done by sending a transaction to the token contract
                signed by the current owner address. If token is not renewed
                within 30 days, ownership is transferred to the Protocol.
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
                <p class="title is-4">Market summary</p>
              </div>
            </div>
            <div class="content">
              <p>
                Stitched into the design of the Hashtag Protocol is an incentive
                structure that rewards all participants of the system.
              </p>
              <p>
                <strong>Creation price</strong> - Hashtag Protocol uses a fair
                auction method to determine the price of a new Hashtag Token.
                The creation price is the amount the winning bidder pays to
                acquire the newly created Hashtag Token. The proceeds of the
                auction are automatically divided between the originating
                Publisher and the Protocol.
              </p>
              <p>
                <strong>Tag count</strong> - In addition to creating unique,
                non-fungible tokens that represent/contain a single, natural
                language hashtag, the Protocol also provides facilities for
                linking a token any online digital artifact, effectively tagging
                that content with the hashtag. Tag count represents how many
                pieces of content have been tagged with this hashtag.
              </p>
              <p>
                <strong>Earnings</strong> - In exchange for facilitating an
                entry to a decentralized, immutable and globally accessible
                database, the Protocol collects a small fee from the
                <strong>Tagger</strong>. The Protocol smart contract then
                automatically distributes this fee among the token owner, the
                publisher facilitating the tagging and the Protocol. The summary
                shown here represents the lifetime sum total of tagging revenue
                distributed by the Protocol for this Hashtag token.
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
                <p class="title is-4">Tagged content</p>
              </div>
            </div>
            <div class="content">
              <p>
                In addition to creating unique, non-fungible tokens that
                represent/contain a single, natural language hashtag, the
                Protocol also provides a facility for linking a token any online
                digital artifact, effectively tagging that content with the
                hashtag. Displayed here is a list of all digital artifacts that
                have been tagged with
                <strong>#{{ hashtagsByName[0].displayHashtag }}</strong
                >.
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
import EthAccount from "../components/EthAccount";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HelpModal from "../components/HelpModal";
import { TAGS_BY_HASHTAG, HASHTAGS_BY_NAME } from "../queries";

export default {
  name: "HashtagDetail",
  components: {
    EthAccount,
    Footer,
    Header,
    HelpModal,
  },
  data() {
    return {
      activeTab: null,
      erc721: "http://erc721.org",
      hashtag: this.$route.params.hashtag,
      hashtagsByName: null,
      isOverviewModalActive: false,
      isSummaryModalActive: false,
      isTaggedModalActive: false,
      tagsByHashtag: null,
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
