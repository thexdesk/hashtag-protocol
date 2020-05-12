<template>
  <div class="body">
    <Modal
      :is-open="isModalOpen"
      :modal-data="modalData"
      @onClose="closeModal"
    />
    <section class="hero has-background-grey-dark is-bold">
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
                <b-field v-if="hashtags">
                  <b-taginput
                    v-model="tagForm.hashtag"
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
                        <b-tag type="is-light">#{{ props.option.name }}</b-tag>
                        <b-tag type="is-info">{{
                          props.option.tagCount
                        }}</b-tag>
                      </b-taglist>
                    </template>
                  </b-taginput>
                </b-field>
                <b-field>
                  <b-autocomplete
                    v-model="tagForm.nftName"
                    placeholder="Select NFT"
                    icon="pound"
                    field="name"
                    @select="(option) => (tagForm.nft = option)"
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
                <div>
                  <b-button
                    type="is-primary"
                    @click="tagNft()"
                    :disabled="!isTaggable()"
                    >Tag asset</b-button
                  >
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="main">
      <div class="container">
        <div class="columns is-tablet is-centered">
          <div class="column is-6 is-12-mobile">
            <article class="is-white notification">
              <p class="title is-5">Newest hashtags</p>
              <b-table :data="hashtags || []">
                <template slot-scope="props">
                  <b-table-column field="name" label="Hashtag">
                    <hashtag :value="props.row.name"></hashtag>
                  </b-table-column>
                  <b-table-column field="timestamp" label="Minted">
                    {{ new Date(props.row.timestamp * 1000) | moment("from") }}
                  </b-table-column>
                  <b-table-column field="owner" label="Owner">
                    <eth-account :value="props.row.owner"></eth-account>
                  </b-table-column>
                  <b-table-column field="publisher" label="Publisher">
                    <eth-account :value="props.row.publisher"></eth-account>
                  </b-table-column>
                </template>
              </b-table>
            </article>
          </div>
          <div class="column is-6 is-12-mobile">
            <article class="is-white notification">
              <p class="title is-5">Recently tagged assets</p>
              <b-table :data="tags || []">
                <template slot-scope="props">
                  <b-table-column field="nftId" label="" width="75">
                    <img
                      :src="props.row.nftImage"
                      style="max-width: 75px; max-height: 75px;"
                    />
                  </b-table-column>
                  <b-table-column field="nftName" label="Asset Name">
                    {{ props.row.nftName }}
                  </b-table-column>
                  <b-table-column field="projectName" label="Project">
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

      <div class="container">
        <div class="columns is-tablet is-centered">
          <div class="column is-6 is-12-mobile">
            <article class="is-white notification">
              <p class="title is-5">Top publishers</p>
              <b-table :data="publishers || []">
                <template slot-scope="props">
                  <b-table-column field="id" label="Publisher">
                    <eth-account :value="props.row.id"></eth-account>
                  </b-table-column>
                  <b-table-column field="mintedCount" label="Minted" centered>
                    {{ props.row.mintCount }}
                  </b-table-column>
                  <b-table-column
                    field="tagCount"
                    label="Assets tagged"
                    centered
                  >
                    {{ props.row.tagCount }}
                  </b-table-column>
                  <b-table-column field="earnings" label="Earnings" centered>
                    <eth-amount-sum
                      :value1="props.row.tagFees"
                      :value2="props.row.mintFees"
                    ></eth-amount-sum>
                  </b-table-column>
                </template>
              </b-table>
            </article>
          </div>
          <div class="column is-6 is-12-mobile">
            <article class="is-white notification">
              <p class="title is-5">Top owners</p>
              <b-table :data="owners || []">
                <template slot-scope="props">
                  <b-table-column field="id" label="Owner">
                    <eth-account :value="props.row.id"></eth-account>
                  </b-table-column>
                  <b-table-column field="mintedCount" label="Minted" centered>
                    {{ props.row.mintCount }}
                  </b-table-column>
                  <b-table-column
                    field="ownedCount"
                    label="Assets tagged"
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

      <div class="container">
        <div class="columns is-tablet is-centered">
          <div class="column is-6 is-12-mobile">
            <article class="is-white notification">
              <p class="title is-5">Popular hashtags</p>
              <b-table :data="popular || []">
                <template slot-scope="props">
                  <b-table-column field="name" label="Hashtag">
                    <hashtag :value="props.row.name"></hashtag>
                  </b-table-column>
                  <b-table-column
                    field="tagCount"
                    label="Assets tagged"
                    centered
                  >
                    {{ props.row.tagCount }}
                  </b-table-column>
                </template>
              </b-table>
            </article>
          </div>
          <div class="column is-6 is-12-mobile">
            <article class="is-white notification">
              <p class="title is-5">Top taggers</p>
              <b-table :data="taggers || []">
                <template slot-scope="props">
                  <b-table-column field="id" label="Tagger">
                    <eth-account :value="props.row.id"></eth-account>
                  </b-table-column>
                  <b-table-column
                    field="tagCount"
                    label="Assets tagged"
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
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { SNAPSHOT } from "../queries";
import Hashtag from "../components/Hashtag";
import EthAccount from "../components/EthAccount";
import EthAmount from "../components/EthAmount";
import EthAmountSum from "../components/EthAmountSum";
import { mapGetters } from "vuex";

export default {
  name: "Hashtags",
  components: {
    EthAmountSum,
    EthAmount,
    EthAccount,
    Hashtag,
    Footer,
    Header,
    Modal,
  },
  data() {
    return {
      isModalOpen: false,
      modalData: {},
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
    closeModal() {
      this.isModalOpen = false;
    },
    openModal(modalData) {
      this.modalData = modalData;
      this.isModalOpen = true;
    },
    mintHashtag() {
      this.$store.dispatch("mint", this.hashtagInput[0]);
    },
    tagNft() {
      this.$store.dispatch("tag", this.tagForm);
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
    isTaggable: function () {
      return (
        this.tagForm.nftName &&
        this.tagForm.nftName.length > 0 &&
        this.tagForm.hashtag &&
        this.tagForm.hashtag.length > 0
      );
    },
  },
};
</script>

<style lang="scss"></style>
