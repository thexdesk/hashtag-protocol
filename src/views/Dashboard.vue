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
                              >#{{ props.option.name }}</b-tag
                            >
                            <b-tag type="is-info">{{
                              props.option.tagCount
                            }}</b-tag>
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
                        >Mint it</b-button
                      >
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
                    @select="onNftSelected"
                    :data="getFilteredNFTs"
                  >
                    <template slot-scope="props">
                      <div class="media">
                        <div class="media-left">
                          <img
                            width="32"
                            :src="props.option.image_preview_url"
                          />
                        </div>
                        <div class="media-content">
                          {{ props.option.name }}
                          <br />
                          <small
                            >{{ props.option.asset_contract.name }}
                            <b>#{{ props.option.token_id }}</b>
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
                  <b-table :data="hashtags || []" focusable>
                    <template slot="footer" v-if="!isCustom">
                      <div class="has-text-right">
                        <router-link :to="{ name: 'hashtags' }"
                          >Browse hashtags</router-link
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
                  <h2 class="title is-5">
                    Recently tagged content
                  </h2>
                  <b-table :data="tags || []" focusable>
                    <template slot="footer" v-if="!isCustom">
                      <div class="has-text-right">
                        <router-link :to="{ name: 'nfts' }"
                          >Browse tagged assets</router-link
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
                      <b-table-column field="nftId" label="" width="75">
                        <img
                          :src="props.row.nftImage"
                          style="max-width: 75px; max-height: 75px;"
                        />
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
                          >Browse publishers</router-link
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
                        field="earnings"
                        label="Earnings"
                        centered
                      >
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
                          >Browse owners</router-link
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
                      <b-table-column field="tagFees" label="Earnings" centered>
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
                          >Browse hashtags</router-link
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
                          >Browse taggers</router-link
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
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Newest hashtags</p>
              </div>
            </div>
            <div class="content">
              <p></p>
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
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Recently tagged content explained</p>
              </div>
            </div>
            <div class="content"></div>
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
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Top publishers explained</p>
              </div>
            </div>
            <div class="content"></div>
          </div>
        </div>
      </b-modal>
      <b-modal :active.sync="isTopOwnersModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Top owners explained</p>
              </div>
            </div>
            <div class="content"></div>
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
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Popular hashtags explained</p>
              </div>
            </div>
            <div class="content"></div>
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
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Top taggers explained</p>
              </div>
            </div>
            <div class="content"></div>
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
                        :src="modalForm.nft.image_original_url"
                        alt="Image"
                      />
                    </figure>
                  </div>
                  <div class="card-content">
                    <span
                      class="has-text-weight-bold is-size-6 is-block"
                      v-if="modalForm.nft"
                      >{{ modalForm.nft.name }}</span
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
                            :allow-new="false"
                            maxtags="1"
                            field="name"
                            icon="pound"
                            placeholder="Select hashtag"
                            @typing="getFilteredTags"
                          >
                            <template slot-scope="props">
                              <b-taglist attached>
                                <b-tag type="is-light"
                                  >#{{ props.option.name }}</b-tag
                                >
                                <b-tag type="is-info">{{
                                  props.option.tagCount
                                }}</b-tag>
                              </b-taglist>
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
                            >Tag asset</b-button
                          >
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
        Platform earnings
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
import NftLink from "../components/NftLink";
import { SNAPSHOT } from "../queries";
import { mapGetters } from "vuex";
import TimestampFrom from "../components/TimestampFrom";

export default {
  name: "Hashtags",
  components: {
    TimestampFrom,
    EthAccount,
    EthAmount,
    EthAmountSum,
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
      modalForm: {
        hashtag: null,
        nft: null,
        nftName: null,
      },
      hashtagInput: null,
      hashtagInputTags: [],
      tagForm: {
        hashtag: null,
        nft: null,
        nftName: null,
      },
    };
  },
  computed: {
    ...mapGetters(["supportedNfts", "nftAssetCache"]),
    getFilteredNFTs() {
      if (!this.tagForm.nftName || !this.nftAssetCache) return [];

      return this.nftAssetCache.assets.filter((option) => {
        if (!option.name) return false;

        return (
          option.name
            .toLowerCase()
            .indexOf(this.tagForm.nftName.toLowerCase()) === 0
        );
      });
    },
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
      query: SNAPSHOT,
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
    async tagNft() {
      await this.$store.dispatch("tag", this.modalForm);
      this.resetModalForm();
      this.isTagModalActive = false;
    },
    dangerToast(message) {
      this.$buefy.toast.open({
        duration: 5000,
        message,
        position: "is-bottom",
        type: "is-danger",
      });
    },
    // Bulma taginput widget.
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
      this.modalForm.nftName = nft.name;
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
      if (hashtag.length < 3) {
        this.dangerToast(
          `Sorry, but '${hashtag}' is an invalid tag as it's less than 3 characters long.`
        );
        return false;
      }

      if (hashtag.length > 15) {
        this.dangerToast(
          `Sorry, but '${hashtag}' is an invalid tag as it's more than 15 characters long.`
        );
        return false;
      }

      if (!/^\d*[a-zA-Z][a-zA-Z0-9]*$/.test(hashtag)) {
        this.dangerToast(
          `Sorry, but '${hashtag}' is an invalid tag as it's either not alpha numeric or only numeric.`
        );
        return false;
      }

      return true;
    },
  },
};
</script>

<style lang="scss"></style>
