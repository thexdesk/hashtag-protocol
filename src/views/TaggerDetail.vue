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
          Tagger: <eth-account :value="tagger"></eth-account>
        </h1>
        <h2 class="subtitle">Hashtag Protocol Tagger</h2>
        <div class="tile is-ancestor">
          <div class="tile is-horizontal">
            <div class="tile is-parent is-6 is-12-mobile">
              <div class="tile is-child box">
                <help-modal
                  modal="isOverviewModalActive"
                  @popModalFromChild="popModal"
                  class="is-pulled-right"
                ></help-modal>
                <h2 class="title is-4">Tagger information</h2>
                <div class="b-table">
                  <div class="table-wrapper">
                    <table class="table">
                      <tbody>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Tagger address</td>
                          <td>
                            <eth-account :value="tagger"></eth-account>
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
                          <td class="has-text-weight-bold">Tag count</td>
                          <td>
                            1121
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Tagging fees</td>
                          <td>
                            0.191 ETH
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
                Content tagged by <eth-account :value="tagger"></eth-account>
              </h2>
              <b-tabs v-model="activeTab" :animated="false">
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
                            <td data-label="Tagged" class="">
                              <span
                                ><a
                                  href="/publisher/0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
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
      <b-modal :active.sync="isOverviewModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Owner information</p>
              </div>
            </div>
            <div class="content">
              <p>
                <strong>Tagger address</strong> - An Ethereum address that has
                tagged content.
              </p>
              <b-collapse
                :open="false"
                position="is-top"
                aria-id="ownerOverview"
                animation="slide"
              >
                <a
                  slot="trigger"
                  slot-scope="props"
                  aria-controls="ownerOverview"
                  class="has-text-weight-bold"
                >
                  <b-icon
                    :icon="!props.open ? 'menu-down' : 'menu-up'"
                  ></b-icon>
                  {{
                    !props.open ? 'What\'s a "Tagger?"' : 'What\'s a "Tagger"?'
                  }}
                </a>
                <p>
                  <br />
                  In addition to creating cryptographic tokens that both contain
                  and represent hashtag strings, the Hashtag Protocol provides a
                  facility for linking them to any online digital artifact,
                  effectively "tagging" that content with the hashtag. This is
                  facilitated by “linking smart contracts” implemented by
                  Publishers within their dApps and applications and executed by
                  users or other applications within a Publisher application.
                </p>
                <p>
                  Linking smart contracts utilize the many-to-many design
                  pattern found in traditional relational database management
                  systems (RDBMS). With the many-to-many relationship, one
                  Hashtag Token can be used to tag unlimited content items
                  and/or one content item can be tagged with unlimited Hashtag
                  Tokens.
                </p>
                <p>
                  Presently, only linking to other ERC-721 NFTs is supported,
                  however The Protocol is designed to be extended and the
                  roadmap includes tagging contracts for other digital content
                  types.
                </p>
                <p>
                  Tagging content (implementing the tagging smart contract)
                  comes with a fee made up of the standard Ethereum transaction
                  gas fee and a Tagging Fee added by the Protocol. The Tagging
                  Fee component is small and identical for all tags. Fees
                  generated by a successful tagging event are automatically
                  distributed among the Owner, the Publisher and the Protocol at
                  proportions defined within the Protocol.
                </p>
              </b-collapse>
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
                <strong>Tag count</strong> - Number of content items tagged by
                this Tagger.
              </p>
              <p>
                <strong>Tagging fees</strong> - Lifetime sum total of tagging
                fees paid this Tagger.
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
                <strong>ERC-721 NFTs</strong><br />Listing of ERC-721
                non-fungible tokens (digital assets) tagged by this Tagger.
              </p>
              <ul>
                <li>
                  <strong>Asset name</strong> - Name of the ERC-721 token
                  tagged.
                </li>
                <li>
                  <strong>Project</strong> - Name of project producing the
                  digital assets that Hashtag Token is being linked to.
                </li>
                <li><strong>Tagged</strong> - Date asset was tagged.</li>
                <li>
                  <strong>Tagger</strong> - Ethereum address of the Tagger.
                </li>
                <li>
                  <strong>Publisher</strong> - Ethereum address of the Publisher
                  platform tagging took place on.
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
  name: "TaggerDetail",
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
      tagger: this.$route.params.address,
      tagsByHashtag: null,
      hashtagsByName: null,
    };
  },
};
</script>

<style lang="scss"></style>
