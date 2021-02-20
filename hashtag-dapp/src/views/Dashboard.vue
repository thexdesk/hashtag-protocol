<template>
  <div class="body dashboard">
    <div class="content-wrapper">
      <Header />
      <section class="widgets">
        <div class="container">
          <div class="columns is-tablet is-centered">
            <div class="column is-5 is-12-mobile">
              <article class="tile is-child">
                <p class="title is-4 has-text-white">Create a hashtag</p>
                <Mint />
              </article>
            </div>
            <div class="divider is-vertical is-hidden-mobile">OR</div>
            <div class="divider is-hidden-tablet">OR</div>
            <div class="column is-5 is-12-mobile">
              <article class="tile is-child">
                <p class="title is-4 has-text-white">Tag some content</p>
                <MintAndTag />
              </article>
            </div>
          </div>
        </div>
      </section>
      <section class="main">
        <div class="container">
          <div class="tile is-ancestor">
            <div class="tile is-horizontal">
              <div class="tile is-parent is-6 is-12-mobile is-vertical">
                <div class="tile is-child box">
                  <article class="is-white">
                    <help-modal
                      modal="isNewHashtagsModalActive"
                      @popModalFromChild="popModal"
                      class="is-pulled-right"
                    ></help-modal>
                    <h2 class="title is-5">Newest hashtags</h2>
                    <b-table
                      :data="hashtags ? hashtags.slice(0, 10) : []"
                      focusable
                    >
                      <template slot="footer" v-if="!isCustom">
                        <div class="has-text-right">
                          <router-link :to="{ name: 'hashtags' }"
                            >Browse hashtags </router-link
                          >&nbsp;
                          <b-icon
                            icon="arrow-right"
                            type="is-dark"
                            size="is-small"
                          >
                          </b-icon>
                        </div>
                      </template>
                      <template slot-scope="props">
                        <b-table-column field="name" label="Hashtag">
                          <hashtag :value="props.row.displayHashtag"></hashtag>
                        </b-table-column>
                        <b-table-column field="timestamp" label="Created">
                          <timestamp-from
                            :value="props.row.timestamp"
                          ></timestamp-from>
                        </b-table-column>
                        <b-table-column
                          field="owner"
                          label="Owner"
                          :visible="$screen.desktop"
                        >
                          <eth-account
                            :value="props.row.owner"
                            route="owner-detail"
                          ></eth-account>
                        </b-table-column>
                        <b-table-column
                          field="publisher"
                          label="Publisher"
                          :visible="$screen.widescreen"
                        >
                          <eth-account
                            :value="props.row.publisher"
                            route="publisher-detail"
                          ></eth-account>
                        </b-table-column>
                      </template>
                    </b-table>
                  </article>
                </div>
              </div>
              <div class="tile is-parent is-6 is-12-mobile">
                <div class="tile is-child box">
                  <article class="is-white">
                    <help-modal
                      modal="isRecentlyTaggedModalActive"
                      @popModalFromChild="popModal"
                      class="is-pulled-right"
                    ></help-modal>
                    <h2 class="title is-5">Recently tagged content</h2>
                    <b-table :data="tags || []" focusable>
                      <template slot="footer" v-if="!isCustom">
                        <div class="has-text-right">
                          <router-link :to="{ name: 'nfts' }"
                            >Browse tagged assets </router-link
                          >&nbsp;
                          <b-icon
                            icon="arrow-right"
                            type="is-dark"
                            size="is-small"
                          >
                          </b-icon>
                        </div>
                      </template>
                      <template slot-scope="props">
                        <b-table-column field="nftId" centered>
                          <router-link
                            :to="{
                              name: 'nft-detail',
                              params: {
                                type: 'nft',
                                contract: props.row.nftContract,
                                id: props.row.nftId,
                              },
                            }"
                          >
                            <img
                              :src="props.row.nftImage"
                              :alt="props.row.nftName"
                              class="nft-thumb"
                            />
                          </router-link>
                        </b-table-column>
                        <b-table-column field="nftName" label="Asset Name">
                          <nft-link
                            type="nft"
                            :name="props.row.nftName"
                            :contract="props.row.nftContract"
                            :id="props.row.nftId"
                          ></nft-link>
                        </b-table-column>
                        <b-table-column
                          field="projectName"
                          label="Project"
                          :visible="$screen.widescreen"
                        >
                          {{ props.row.nftContractName }}
                        </b-table-column>
                        <b-table-column field="hashtagName" label="Hashtag">
                          <hashtag
                            :value="props.row.hashtagDisplayHashtag"
                          ></hashtag>
                        </b-table-column>
                      </template>
                    </b-table>
                  </article>
                </div>
              </div>
            </div>
          </div>
          <div class="tile is-ancestor">
            <div class="tile is-horizontal">
              <div class="tile is-parent is-6 is-12-mobile">
                <div class="tile is-child box">
                  <article class="is-white">
                    <help-modal
                      modal="isTopPublishersModalActive"
                      @popModalFromChild="popModal"
                      class="is-pulled-right"
                    ></help-modal>
                    <h2 class="title is-5">Top publishers</h2>
                    <b-table :data="publishers || []">
                      <template slot="footer" v-if="!isCustom">
                        <div class="has-text-right">
                          <router-link :to="{ name: 'publishers' }"
                            >Browse publishers </router-link
                          >&nbsp;
                          <b-icon
                            icon="arrow-right"
                            type="is-dark"
                            size="is-small"
                          >
                          </b-icon>
                        </div>
                      </template>
                      <template slot-scope="props" focusable>
                        <b-table-column field="id" label="Publisher">
                          <eth-account
                            :value="props.row.id"
                            route="publisher-detail"
                          ></eth-account>
                        </b-table-column>
                        <b-table-column
                          field="mintedCount"
                          label="Hashtags"
                          centered
                        >
                          {{ props.row.mintCount }}
                        </b-table-column>
                        <b-table-column
                          field="tagCount"
                          label="Tag count"
                          centered
                        >
                          {{ props.row.tagCount }}
                        </b-table-column>
                        <b-table-column
                          field="revenue"
                          label="Revenue"
                          centered
                        >
                          <eth-amount :value="props.row.tagFees"></eth-amount>
                        </b-table-column>
                      </template>
                    </b-table>
                  </article>
                </div>
              </div>
              <div class="tile is-parent is-6 is-12-mobile">
                <div class="tile is-child box">
                  <article class="is-white">
                    <help-modal
                      modal="isTopOwnersModalActive"
                      @popModalFromChild="popModal"
                      class="is-pulled-right"
                    ></help-modal>
                    <h2 class="title is-5">Top owners</h2>
                    <b-table :data="owners || []" focusable>
                      <template slot="footer" v-if="!isCustom">
                        <div class="has-text-right">
                          <router-link :to="{ name: 'owners' }"
                            >Browse owners </router-link
                          >&nbsp;
                          <b-icon
                            icon="arrow-right"
                            type="is-dark"
                            size="is-small"
                          >
                          </b-icon>
                        </div>
                      </template>
                      <template slot-scope="props">
                        <b-table-column field="id" label="Owner">
                          <eth-account
                            :value="props.row.id"
                            route="owner-detail"
                          ></eth-account>
                        </b-table-column>
                        <b-table-column
                          field="mintedCount"
                          label="Hashtags"
                          centered
                        >
                          {{ props.row.mintCount }}
                        </b-table-column>
                        <b-table-column
                          field="ownedCount"
                          label="Tag count"
                          centered
                        >
                          {{ props.row.tagCount }}
                        </b-table-column>
                        <b-table-column
                          field="tagFees"
                          label="Revenue"
                          centered
                        >
                          <eth-amount :value="props.row.tagFees"></eth-amount>
                        </b-table-column>
                      </template>
                    </b-table>
                  </article>
                </div>
              </div>
            </div>
          </div>
          <div class="tile is-ancestor">
            <div class="tile is-horizontal">
              <div class="tile is-parent is-6 is-12-mobile">
                <div class="tile is-child box">
                  <article class="is-white">
                    <help-modal
                      modal="isPopHashtagsModalActive"
                      @popModalFromChild="popModal"
                      class="is-pulled-right"
                    ></help-modal>
                    <h2 class="title is-5">Popular hashtags</h2>
                    <b-table :data="popular || []" focusable>
                      <template slot="footer" v-if="!isCustom">
                        <div class="has-text-right">
                          <router-link :to="{ name: 'hashtags' }"
                            >Browse hashtags </router-link
                          >&nbsp;
                          <b-icon
                            icon="arrow-right"
                            type="is-dark"
                            size="is-small"
                          >
                          </b-icon>
                        </div>
                      </template>
                      <template slot-scope="props">
                        <b-table-column field="name" label="Hashtag">
                          <hashtag :value="props.row.displayHashtag"></hashtag>
                        </b-table-column>
                        <b-table-column
                          field="tagCount"
                          label="Tag count"
                          centered
                        >
                          {{ props.row.tagCount }}
                        </b-table-column>
                      </template>
                    </b-table>
                  </article>
                </div>
              </div>
              <div class="tile is-parent is-6 is-12-mobile">
                <div class="tile is-child box">
                  <help-modal
                    modal="isTopTaggersModalActive"
                    @popModalFromChild="popModal"
                    class="is-pulled-right"
                  ></help-modal>
                  <article class="is-white">
                    <h2 class="title is-5">Top taggers</h2>
                    <b-table :data="taggers || []" focusable>
                      <template slot="footer" v-if="!isCustom">
                        <div class="has-text-right">
                          <router-link :to="{ name: 'taggers' }"
                            >Browse taggers </router-link
                          >&nbsp;
                          <b-icon
                            icon="arrow-right"
                            type="is-dark"
                            size="is-small"
                          >
                          </b-icon>
                        </div>
                      </template>
                      <template slot-scope="props">
                        <b-table-column field="id" label="Tagger">
                          <eth-account
                            :value="props.row.id"
                            route="tagger-detail"
                          ></eth-account>
                        </b-table-column>
                        <b-table-column
                          field="tagCount"
                          label="Tag count"
                          centered
                        >
                          {{ props.row.tagCount }}
                        </b-table-column>
                      </template>
                    </b-table>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Help modals -->
        <b-modal
          :active.sync="isNewHashtagsModalActive"
          :width="640"
          scroll="keep"
        >
          <div class="card">
            <div class="card-content">
              <div class="content">
                <markdown-doc
                  doc-type="help"
                  filename="dashboard-newest-hashtags"
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
                        ? "What's a Hashtag Token?"
                        : "What's a Hashtag Token?"
                    }}
                  </a>
                  <markdown-doc
                    doc-type="faq"
                    filename="020-what-is-hashtag-token"
                    class="pt-1 pb-1"
                  ></markdown-doc>
                </b-collapse>
              </div>
            </div>
          </div>
        </b-modal>
        <b-modal
          :active.sync="isRecentlyTaggedModalActive"
          :width="640"
          scroll="keep"
        >
          <div class="card">
            <div class="card-content">
              <div class="content">
                <markdown-doc
                  doc-type="help"
                  filename="dashboard-recently-tagged"
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
                        ? 'What is "tagged content"?'
                        : 'What is "tagged content"?'
                    }}
                  </a>
                  <markdown-doc
                    doc-type="faq"
                    filename="030-what-is-tagged-content"
                    class="pt-1 pb-1"
                  ></markdown-doc>
                </b-collapse>
              </div>
            </div>
          </div>
        </b-modal>
        <b-modal
          :active.sync="isTopPublishersModalActive"
          :width="640"
          scroll="keep"
        >
          <div class="card">
            <div class="card-content">
              <div class="content">
                <markdown-doc
                  doc-type="help"
                  filename="dashboard-top-publishers"
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
                        ? 'What\'s a "Publisher"?'
                        : 'What\'s a "Publisher"?'
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
        <b-modal
          :active.sync="isTopOwnersModalActive"
          :width="640"
          scroll="keep"
        >
          <div class="card">
            <div class="card-content">
              <div class="content">
                <markdown-doc
                  doc-type="help"
                  filename="dashboard-top-owners"
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
                        ? 'What\'s an "Owner"?'
                        : 'What\'s an "Owner"?'
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
        <b-modal
          :active.sync="isPopHashtagsModalActive"
          :width="640"
          scroll="keep"
        >
          <div class="card">
            <div class="card-content">
              <div class="content">
                <markdown-doc
                  doc-type="help"
                  filename="dashboard-popular-hashtags"
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
                        ? "What's a Hashtag Token?"
                        : "What's a Hashtag Token?"
                    }}
                  </a>
                  <markdown-doc
                    doc-type="faq"
                    filename="020-what-is-hashtag-token"
                    class="pt-1 pb-1"
                  ></markdown-doc>
                </b-collapse>
              </div>
            </div>
          </div>
        </b-modal>
        <b-modal
          :active.sync="isTopTaggersModalActive"
          :width="640"
          scroll="keep"
        >
          <div class="card">
            <div class="card-content">
              <div class="content">
                <markdown-doc
                  doc-type="help"
                  filename="dashboard-top-taggers"
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
                        ? 'What\'s a "Tagger"?'
                        : 'What\'s a "Tagger"?'
                    }}
                  </a>
                  <markdown-doc
                    doc-type="faq"
                    filename="060-what-is-a-tagger"
                    class="pt-1 pb-1"
                  ></markdown-doc>
                </b-collapse>
              </div>
            </div>
          </div>
        </b-modal>
      </section>
    </div>
    <Footer />
  </div>
</template>

<script>
import EthAccount from "../components/EthAccount";
import EthAmount from "../components/EthAmount";
import Footer from "../components/Footer";
import Hashtag from "../components/Hashtag";
import Header from "../components/Header";
import HelpModal from "../components/HelpModal";
import MarkdownDoc from "../components/MarkdownDoc";
import Mint from "../components/Mint";
import MintAndTag from "../components/MintAndTag";
import NftLink from "../components/NftLink";
import { SNAPSHOT, FIRST_THOUSAND_HASHTAGS } from "@/queries";
//import { mapGetters } from "vuex";
import TimestampFrom from "../components/TimestampFrom";
//import HashtagValidationService from "@/services/HashtagValidationService";
//import debounce from "lodash/debounce";

export default {
  name: "Hashtags",
  components: {
    EthAccount,
    EthAmount,
    Footer,
    Hashtag,
    Header,
    HelpModal,
    MarkdownDoc,
    Mint,
    MintAndTag,
    NftLink,
    TimestampFrom,
  },
  data() {
    return {
      isNewHashtagsModalActive: false,
      isRecentlyTaggedModalActive: false,
      isTopPublishersModalActive: false,
      isTopOwnersModalActive: false,
      isPopHashtagsModalActive: false,
      isTopTaggersModalActive: false,
      isCustom: false,
    };
  },
  apollo: {
    hashtags: {
      query: FIRST_THOUSAND_HASHTAGS,
      pollInterval: 1000, // ms
    },
    publishers: {
      query: SNAPSHOT,
      pollInterval: 1000, // ms
    },
    owners: {
      query: SNAPSHOT,
      pollInterval: 1000, // ms
    },
    tags: {
      query: SNAPSHOT,
      pollInterval: 1000, // ms
    },
    popular: {
      query: SNAPSHOT,
      pollInterval: 1000, // ms
    },
    platform: {
      query: SNAPSHOT,
      pollInterval: 1000, // ms
    },
    taggers: {
      query: SNAPSHOT,
      pollInterval: 1000, // ms
    },
  },
};
</script>

<style lang="scss">
section.widgets {
  padding-bottom: 5rem;
}

.modal-tag {
  padding: 1rem;
}
</style>
