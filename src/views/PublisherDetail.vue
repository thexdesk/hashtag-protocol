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
          Publisher: KnownOrigin
        </h1>
        <h2 class="subtitle">Hashtag Protocol Publisher</h2>
        <div class="tile is-ancestor">
          <div class="tile is-horizontal">
            <div class="tile is-parent is-6 is-12-mobile">
              <div class="tile is-child box">
                <help-modal
                  modal="isPubInfoModalActive"
                  @popModalFromChild="popModal"
                  class="is-pulled-right"
                ></help-modal>
                <h2 class="title is-4">Publisher information</h2>
                <div class="b-table">
                  <div class="table-wrapper">
                    <table class="table">
                      <tbody>
                        <tr>
                          <td class="has-text-weight-bold">Name</td>
                          <td>
                            {{ publisherName }}
                            <code>TODO</code>
                          </td>
                        </tr>
                        <tr>
                          <td class="has-text-weight-bold">
                            Publisher address
                          </td>
                          <td>
                            <eth-account :value="publisher"></eth-account>
                          </td>
                        </tr>
                        <tr>
                          <td class="has-text-weight-bold">Official website</td>
                          <td>
                            <a v-bind:href="publisherWebsite"
                              >{{ publisherWebsite }}
                              <b-icon icon="open-in-new" size="is-small">
                              </b-icon
                            ></a>
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
                <h2 class="title is-4">
                  Market summary for KnownOrigin
                </h2>
                <div class="b-table" v-if="publisherByAcc">
                  <div class="table-wrapper">
                    <table class="table">
                      <tbody>
                        <tr>
                          <td class="has-text-weight-bold">Hashtags</td>
                          <td>
                            {{ publisherByAcc.mintCount }}
                          </td>
                        </tr>
                        <tr>
                          <td class="has-text-weight-bold">Hashtag revenue</td>
                          <td>
                            <eth-amount
                              :value="publisherByAcc.mintFees"
                            ></eth-amount>
                          </td>
                        </tr>
                        <tr>
                          <td class="has-text-weight-bold">Tag count</td>
                          <td>
                            {{ publisherByAcc.tagCount }}
                          </td>
                        </tr>
                        <tr>
                          <td class="has-text-weight-bold">Tagging revenue</td>
                          <td>
                            <eth-amount
                              :value="publisherByAcc.tagFees"
                            ></eth-amount>
                          </td>
                        </tr>
                        <tr>
                          <td class="has-text-weight-bold">Total revenue</td>
                          <td>
                            <eth-amount-sum
                              :value1="publisherByAcc.mintFees"
                              :value2="publisherByAcc.tagFees"
                            ></eth-amount-sum>
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
                modal="isActivityModalActive"
                @popModalFromChild="popModal"
                class="is-pulled-right"
              ></help-modal>
              <h2 class="title is-4 is-spaced">
                Recent activity on KnownOrigin
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
                                Owner
                                <!---->
                              </div>
                            </th>
                            <th class="">
                              <div class="th-wrap">
                                Tag count
                                <!---->
                              </div>
                            </th>
                          </tr>
                          <!---->
                          <!---->
                        </thead>
                        <tbody>
                          <tr>
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
                              <span
                                ><a
                                  href="/owner/0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
                                  class=""
                                >
                                  0x40 ... ab5f
                                </a></span
                              >
                            </td>
                            <td data-label="tag-count" class="">
                              <span>
                                23
                              </span>
                            </td>
                          </tr>
                          <!---->
                          <!---->
                          <tr>
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
                              <span
                                ><a
                                  href="/owner/0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
                                  class=""
                                >
                                  0x40 ... ab5f
                                </a></span
                              >
                            </td>
                            <td data-label="tag-count" class="">
                              <span>
                                23
                              </span>
                            </td>
                          </tr>
                          <!---->
                          <!---->
                          <tr>
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
                              <span
                                ><a
                                  href="/owner/0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
                                  class=""
                                >
                                  0x40 ... ab5f
                                </a></span
                              >
                            </td>
                            <td data-label="tag-count" class="">
                              <span>
                                23
                              </span>
                            </td>
                          </tr>
                          <!---->
                          <!---->
                          <tr>
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
                              <span
                                ><a
                                  href="/owner/0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
                                  class=""
                                >
                                  0x40 ... ab5f
                                </a></span
                              >
                            </td>
                            <td data-label="tag-count" class="">
                              <span>
                                23
                              </span>
                            </td>
                          </tr>
                          <!---->
                          <!---->
                          <tr>
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
                              <span
                                ><a
                                  href="/owner/0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
                                  class=""
                                >
                                  0x40 ... ab5f
                                </a></span
                              >
                            </td>
                            <td data-label="tag-count" class="">
                              <span>
                                23
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
                <b-tab-item label="Tag count">
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
                            <td data-label="Project" class="">
                              KnownOrigin
                            </td>
                            <td data-label="Hashtag" class="">
                              <span
                                ><a href="/hashtag/SharkWeek" class="">
                                  #SharkWeek
                                </a></span
                              >
                            </td>
                            <td data-label="Tagged" class="">
                              2 days ago
                            </td>
                            <td data-label="Tagger" class="">
                              <span
                                ><a
                                  href="/tagger/0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
                                  class=""
                                >
                                  0x40 ... ab5f
                                </a></span
                              >
                            </td>
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
      <b-modal :active.sync="isPubInfoModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Publisher information</p>
              </div>
            </div>
            <div class="content">
              <p>
                <strong>Name</strong> - Name of the participating Publisher.
              </p>
              <p>
                <strong>Publisher address</strong> - Ethereum address of the
                Publisher.
              </p>
              <p>
                <strong>Official website</strong> - URL and hyperlink to the
                Publisher's official website.
              </p>
              <p>
                <b-collapse
                  :open="false"
                  position="is-top"
                  aria-id="contentIdForA11y1"
                  animation="slide"
                >
                  <a
                    slot="trigger"
                    slot-scope="props"
                    aria-controls="MarketOverview"
                    class="has-text-weight-bold"
                  >
                    <b-icon
                      :icon="!props.open ? 'menu-down' : 'menu-up'"
                    ></b-icon>
                    {{
                      !props.open
                        ? 'What\'s a "Publisher"?'
                        : 'What\'s a "Publisher"?'
                    }}
                  </a>
                  <p>
                    <br />
                    A Publisher is an application, network or platform
                    implementing the Hashtag Protocol to provide their customers
                    and/or application content tagging stored to a
                    decentralized, globally readable database.
                  </p>
                  <p>
                    At the present time, Publishers must be white-listed to use
                    The Protocol. If you'd like to whitelist your application,
                    please
                    <a v-bind:href="publisherRegURL"
                      >register your application</a
                    >.
                  </p>
                </b-collapse>
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
                <strong>Hashtags</strong> - Number of Hashtags Tokens created
                through Publisher application.
              </p>
              <p>
                <strong>Hashtag revenue</strong> - Publisher revenue for Hashtag
                Tokens created on Publisher application.
              </p>
              <p>
                <strong>Tag count</strong> - Number of content items tagged with
                any hashtag on Publisher application.
              </p>
              <p>
                <strong>Tagging revenue</strong> - Publisher revenue from
                content tagged on Publisher application.
              </p>
              <p>
                <strong>Total revenue</strong> - Total Hashtag Protocol revenue
                for this Publisher.
              </p>
              <p>
                <b-collapse
                  :open="false"
                  position="is-top"
                  aria-id="contentIdForA11y1"
                  animation="slide"
                >
                  <a
                    slot="trigger"
                    slot-scope="props"
                    aria-controls="MarketOverview"
                    class="has-text-weight-bold"
                  >
                    <b-icon
                      :icon="!props.open ? 'menu-down' : 'menu-up'"
                    ></b-icon>
                    {{
                      !props.open
                        ? 'What is the "Hashtag Market"?'
                        : 'What is the "Hashtag Market"?'
                    }}
                  </a>
                  <p>
                    <br />
                    Hashtag is a protocol on the Ethereum blockchain that
                    creates a market & incentive economy around the creation and
                    use of hashtags. The protocol aims to create a virtuous,
                    financially incentivized system that creates more value to
                    all participants the more it grows.
                  </p>
                  <p>
                    The system revolves around four participants: Creator,
                    Owner, Publisher and Tagger. These key market participants
                    interact directly with the protocol, paying to use and
                    earning from the system without having to negotiate terms of
                    use. The data generated by the protocol is immutable
                    (impervious to censorship) and globally accessible.
                  </p>
                  <p>
                    Hashtag Protocol uses an auction method to determine the
                    price of a new Hashtag Token. The "creation price" is the
                    amount the winning bidder pays to acquire the newly created
                    Hashtag Token. The proceeds of the auction are automatically
                    divided between the originating Publisher and the Protocol.
                  </p>
                  <p>
                    In addition to creating unique, non-fungible tokens that
                    both contain and represent a single, natural language
                    hashtag, the Protocol also provides facilities for linking a
                    token any online digital artifact, effectively tagging that
                    content with the hashtag. Tag count quantifies how many
                    pieces of content have been tagged with this hashtag.
                  </p>
                  <p>
                    In exchange for facilitating an entry to a decentralized,
                    immutable and globally accessible database, the Protocol
                    collects a small fee from the Tagger when they tag content.
                    The Protocol smart contract then automatically distributes
                    this fee among the token owner, the publisher facilitating
                    the tagging and the Protocol.
                  </p>
                </b-collapse>
              </p>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal :active.sync="isActivityModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Publisher activity</p>
              </div>
            </div>
            <div class="content">
              <p>
                <strong>Hashtags</strong><br />Listing of Hasthag Protocol
                tokens created on this Publisher platform.
              </p>
              <ul>
                <li>
                  <strong>Hashtag</strong> - Name of the Hashtag Token; same as
                  the hashtag string stored inside the token.
                </li>
                <li>
                  <strong>Created</strong> - Date token was created and added to
                  Ethereum blockchain.
                </li>
                <li>
                  <strong>Owner</strong> - Ethereum address of token owner.
                </li>
                <li>
                  <strong>Tag count</strong> - Number of content items tagged
                  with Hashtag Token across all Publisher platforms.
                </li>
                <li>
                  <strong>Tagging revenue</strong> - Total revenue generated for
                  tagging fees for this token across all Publisher platforms.
                </li>
              </ul>
              <p>
                <strong>Tag count</strong><br />Listing of content tagged on
                this Publisher application.
              </p>
              <ul>
                <li>
                  <strong>Asset name</strong> - Name of the ERC-721 token.
                </li>
                <li>
                  <strong>Hashtag</strong> - Hashtag Token the asset is tagged
                  with.
                </li>
                <li>
                  <strong>Project</strong> - Name of project producing the
                  digital assets that Hashtag Tokens are being linked to.
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
import { PUBLISHER_BY_ACC } from "../queries";
import EthAmountSum from "../components/EthAmountSum";
import EthAmount from "../components/EthAmount";

export default {
  name: "PublisherDetail",
  components: {
    EthAmount,
    EthAmountSum,
    EthAccount,
    Footer,
    Header,
    HelpModal,
  },
  data() {
    return {
      activeTab: null,
      hashtagsByName: null,
      isPubInfoModalActive: false,
      isSummaryModalActive: false,
      isActivityModalActive: false,
      publisher: this.$route.params.address,
      publisherName: "KnownOrigin",
      publisherRegistration: "https://#",
      publisherWebsite: "https://knownorigin.io",
      tagsByHashtag: null,
    };
  },
  apollo: {
    publisherByAcc: {
      query: PUBLISHER_BY_ACC,
      variables() {
        return {
          id: this.publisher,
        };
      },
    },
  },
};
</script>

<style lang="scss"></style>
