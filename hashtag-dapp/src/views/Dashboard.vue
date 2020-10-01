<template>
  <div class="body">
    <section class="hero dash has-background-grey-dark is-bold">
      <div class="hero-head">
        <div class="container">
          <Header></Header>
        </div>
      </div>
      <div class="hero-body">
        <div class="container">
          <div class="columns is-tablet is-centered">
            <div class="column is-5 is-12-mobile">
              <article class="tile is-child">
                <p class="subtitle is-5 has-text-white">Mint a new hashtag</p>
                <template>
                  <section>
                    <b-field v-if="hashtags">
                      <b-taginput
                        v-model="hashtagInput"
                        :data="hashtagInputTags"
                        autocomplete
                        :allow-new="true"
                        maxtags="1"
                        field="name"
                        icon="pound"
                        placeholder="Enter hashtag"
                        @typing="getFilteredTags"
                        :before-adding="validateTag"
                      >
                        <template slot-scope="props">
                          <b-taglist attached>
                            <b-tag type="is-light"
                              >#{{ props.option.name }}
                            </b-tag>
                            <b-tag type="is-info"
                              >{{ props.option.tagCount }}
                            </b-tag>
                          </b-taglist>
                        </template>
                        <template slot="empty">
                          Unique hashtag! Press enter to begin minting.
                        </template>
                      </b-taginput>
                    </b-field>
                    <div>
                      <b-button
                        type="is-primary"
                        @click="mintHashtag()"
                        :disabled="!isNewTag()"
                        >Mint it
                      </b-button>
                    </div>
                  </section>
                </template>
              </article>
            </div>
            <div class="divider is-vertical is-hidden-mobile">OR</div>
            <div class="divider is-hidden-tablet">OR</div>
            <div class="column is-5 is-12-mobile">
              <article class="tile is-child">
                <p class="subtitle is-5 has-text-white">Tag a digital asset</p>
                <b-field>
                  <b-autocomplete
                    v-model="tagForm.nftName"
                    placeholder="Select NFT"
                    icon="pound"
                    field="name"
                    :loading="isFetching"
                    @select="onNftSelected"
                    @typing="getAsyncData"
                    :data="nameContains"
                  >
                    <template slot-scope="props">
                      <div class="media">
                        <div class="media-left">
                          <img
                            :src="props.option.metadataImageURI"
                            width="32"
                          />
                        </div>
                        <div class="media-content">
                          {{ props.option.metadataName }}
                          <br />
                          <small
                            >{{ props.option.contractName }}
                            <b>#{{ props.option.tokenId }}</b>
                          </small>
                        </div>
                      </div>
                    </template>
                  </b-autocomplete>
                </b-field>
              </article>
            </div>
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
                        <hashtag :value="props.row.hashtagName"></hashtag>
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
                      <b-table-column field="revenue" label="Revenue" centered>
                        <eth-amount-sum
                          :value1="props.row.tagFees"
                          :value2="props.row.mintFees"
                        ></eth-amount-sum>
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
                      <b-table-column field="tagFees" label="Revenue" centered>
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
                        <hashtag :value="props.row.name"></hashtag>
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
                  filename="what-is-hashtag-token"
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
                  filename="what-is-tagged-content"
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
                  filename="what-is-a-publisher"
                  class="pt-1 pb-1"
                ></markdown-doc>
              </b-collapse>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal :active.sync="isTopOwnersModalActive" :width="640" scroll="keep">
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
                    !props.open ? 'What\'s an "Owner"?' : 'What\'s an "Owner"?'
                  }}
                </a>
                <markdown-doc
                  doc-type="faq"
                  filename="what-is-an-owner"
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
                  filename="what-is-hashtag-token"
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
                    !props.open ? 'What\'s a "Tagger"?' : 'What\'s a "Tagger"?'
                  }}
                </a>
                <markdown-doc
                  doc-type="faq"
                  filename="what-is-hashtag-token"
                  class="pt-1 pb-1"
                ></markdown-doc>
              </b-collapse>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal
        :active.sync="isTagModalActive"
        :width="720"
        scroll="keep"
        @close="resetModalForm"
      >
        <div class="card">
          <div class="card-content">
            <div class="tile is-ancestor">
              <div class="tile is-5">
                <!-- 1/3 -->
                <div class="card">
                  <div class="card-image">
                    <figure class="image">
                      <img
                        v-if="modalForm.nft"
                        :src="modalForm.nft.metadataImageURI"
                        alt="Image"
                      />
                    </figure>
                  </div>
                  <div class="card-content">
                    <span
                      class="has-text-weight-bold is-size-6 is-block"
                      v-if="modalForm.nft"
                      >{{ modalForm.nft.metadataName }}</span
                    >
                    <Span class="is-size-7 is-block">Known Origin</Span>
                  </div>
                </div>
              </div>
              <div class="tile">
                <section class="section" style="width: 100%;">
                  <div class="container">
                    <div class="content">
                      <span class="has-text-weight-bold is-size-4 is-block"
                        >Tag this asset</span
                      >
                      <span class="is-block is-size-7"
                        >Choose a hashtag to describe this digital asset.</span
                      >
                    </div>

                    <form>
                      <div class="field">
                        <div class="control">
                          <b-taginput
                            v-model="modalForm.hashtag"
                            :data="hashtagInputTags"
                            autocomplete
                            :allow-new="true"
                            maxtags="1"
                            field="name"
                            icon="pound"
                            placeholder="Seach for hashtag"
                            @typing="getFilteredTags"
                            @add="tagAssetValidation"
                            :before-adding="validateTag"
                          >
                            <template slot-scope="props">
                              <b-taglist attached>
                                <b-tag type="is-light"
                                  >#{{ props.option.name }}
                                </b-tag>
                                <b-tag type="is-info"
                                  >{{ props.option.tagCount }}
                                </b-tag>
                              </b-taglist>
                            </template>
                            <template slot="empty">
                              New hashtag! We'll mint it & tag this asset...
                            </template>
                          </b-taginput>
                        </div>
                      </div>
                      <div class="field">
                        <div class="control">
                          <b-button
                            type="is-primary"
                            @click="tagNft()"
                            :disabled="!isTaggable"
                            >Tag asset
                          </b-button>
                        </div>
                      </div>
                    </form>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
    </section>
    <Footer>
      <span v-if="platform" class="has-text-grey-light">
        Platform revenue
        <eth-amount-sum
          :value1="platform.mintFees"
          :value2="platform.tagFees"
        ></eth-amount-sum>
      </span>
    </Footer>
  </div>
</template>

<script>
import EthAccount from "../components/EthAccount";
import EthAmount from "../components/EthAmount";
import EthAmountSum from "../components/EthAmountSum";
import Footer from "../components/Footer";
import Hashtag from "../components/Hashtag";
import Header from "../components/Header";
import HelpModal from "../components/HelpModal";
import MarkdownDoc from "../components/MarkdownDoc";
import NftLink from "../components/NftLink";
import {
  SNAPSHOT,
  FIRST_THOUSAND_HASHTAGS,
  NFTS_ASSETS_NAME_CONTAINS,
} from "@/queries";
import { mapGetters } from "vuex";
import TimestampFrom from "../components/TimestampFrom";
import HashtagValidationService from "@/services/HashtagValidationService";
import debounce from "lodash/debounce";

export default {
  name: "Hashtags",
  components: {
    TimestampFrom,
    EthAccount,
    EthAmount,
    EthAmountSum,
    MarkdownDoc,
    Footer,
    Hashtag,
    Header,
    HelpModal,
    NftLink,
  },
  data() {
    return {
      isNewHashtagsModalActive: false,
      isRecentlyTaggedModalActive: false,
      isTopPublishersModalActive: false,
      isTopOwnersModalActive: false,
      isPopHashtagsModalActive: false,
      isTopTaggersModalActive: false,
      isTagModalActive: false,
      isCustom: false,
      modalForm: {
        hashtag: null,
        nft: null,
        nftName: null,
        mintAndTag: false,
      },
      hashtagInput: null,
      hashtagInputTags: [],
      nameContains: [],
      isFetching: false,
      tagForm: {
        hashtag: null,
        nft: null,
        nftName: null,
      },
    };
  },
  computed: {
    ...mapGetters(["supportedNfts", "nftAssetCache"]),
    isTaggable() {
      return (
        this.modalForm.nftName &&
        this.modalForm.nftName.length > 0 &&
        this.modalForm.hashtag &&
        this.modalForm.hashtag.length > 0
      );
    },
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
  methods: {
    getAsyncData: debounce(async function (name) {
      if (!name.length) {
        this.nameContains = [];
        return;
      }

      const { data } = await this.$apollo.query({
        query: NFTS_ASSETS_NAME_CONTAINS,
        client: "nftsClient",
        variables: {
          first: 100,
          name: name,
        },
      });

      this.nameContains = data.nameContains;
    }, 300),
    async tagNft() {
      if (this.modalForm.mintAndTag) {
        await this.$store.dispatch("mintAndTag", {
          hashtag: this.modalForm.hashtag[0],
          nftContract: this.modalForm.nft.contractAddress,
          nftId: this.modalForm.nft.tokenId,
        });
      } else {
        await this.$store.dispatch("tag", {
          hashtagId: this.modalForm.hashtag[0].id,
          nftContract: this.modalForm.nft.contractAddress,
          nftId: this.modalForm.nft.tokenId,
        });
      }

      this.resetModalForm();
      this.isTagModalActive = false;
    },
    getFilteredTags: function (text) {
      this.hashtagInputTags = (this.hashtags || []).filter((option) => {
        return option.name.toLowerCase().indexOf(text.toLowerCase()) === 0;
      });
    },
    isNewTag: function () {
      if (
        this.hashtagInput &&
        Array.isArray(this.hashtagInput) &&
        (typeof this.hashtagInput[0] === "string" ||
          this.hashtagInput[0] instanceof String)
      ) {
        return (
          (this.hashtags || []).filter((option) => {
            return (
              option.name
                .toLowerCase()
                .indexOf(this.hashtagInput[0].toLowerCase()) >= 0
            );
          }).length === 0
        );
      }

      return false;
    },
    mintHashtag() {
      this.$store.dispatch("mint", this.hashtagInput[0]);
    },
    onNftSelected(nft) {
      this.modalForm.nft = nft;
      this.modalForm.nftName = nft.metadataName;
      this.isTagModalActive = true;
    },
    resetModalForm() {
      this.modalForm = {
        hashtag: null,
        nft: null,
        nftName: null,
      };
    },
    validateTag(hashtag) {
      return this.hashtagValidationService.validateTag(hashtag);
    },
    tagAssetValidation(hashtag) {
      const tagContentValid = this.validateTag(hashtag);

      if (tagContentValid) {
        const hashtagValue =
          this.modalForm.hashtag[0] && this.modalForm.hashtag[0].name
            ? this.modalForm.hashtag[0].name
            : this.modalForm.hashtag[0];

        const isNewHashtag =
          (this.hashtagInputTags || []).filter((option) => {
            return (
              option.name.toLowerCase().indexOf(hashtagValue.toLowerCase()) >= 0
            );
          }).length === 0;

        this.modalForm.mintAndTag = isNewHashtag;
      }
    },
  },
  created() {
    this.hashtagValidationService = new HashtagValidationService(
      this.$buefy.toast
    );
  },
};
</script>

<style lang="scss"></style>
