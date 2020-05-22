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
        <h1 class="title is-1">#SharkWeek</h1>
        <div class="tile is-ancestor">
          <div class="tile is-horizontal">
            <div class="tile is-parent is-6 is-12-mobile">
              <div class="tile is-child box">
                <p class="title is-4">Overview</p>
                <div class="b-table">
                  <div class="table-wrapper">
                    <table class="table">
                      <tbody>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Minted</td>
                          <td>11/22/20</td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Publisher</td>
                          <td>knownorigin.eth</td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Creator</td>
                          <td>artist.eth</td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Owner</td>
                          <td>artist.eth</td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Expires</td>
                          <td>11/22/2022 (629 days)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="tile is-parent is-6 is-12-mobile">
              <div class="tile is-child box">
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
            <article class="is-white notification">
              <h3 class="title is-3 is-spaced">Tagged artifacts</h3>
              <b-tabs v-model="activeTab" animated="false">
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
                        <tbody>
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
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
                              KnownOriginDigitalAsset
                            </td>
                            <td data-label="Tagged" class="">
                              <span>2 days ago</span>
                            </td>
                            <td data-label="Tagger" class="">
                              <span>0x07 ... 5b0e</span>
                            </td>
                            <td data-label="Publisher" class="">
                              <span>0xd6 ... bc4b</span>
                            </td>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
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
                              KnownOriginDigitalAsset
                            </td>
                            <td data-label="Tagged" class="">
                              <span>2 days ago</span>
                            </td>
                            <td data-label="Tagger" class="">
                              <span>0x07 ... 5b0e</span>
                            </td>
                            <td data-label="Publisher" class="">
                              <span>0xd6 ... bc4b</span>
                            </td>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="" class="">
                              <img
                                src="https://ipfs.infura.io/ipfs/QmPfpZToedF2MnBgmBAhmWf5rXUYKvMbww2zA16J8JG8tc"
                                style="max-width: 75px; max-height: 75px;"
                              />
                            </td>
                            <td data-label="Asset Name" class="">
                              MetaFactory Tester Badge
                            </td>
                            <td data-label="Project" class="">
                              KnownOriginDigitalAsset
                            </td>
                            <td data-label="Tagged" class="">
                              <span>2 days ago</span>
                            </td>
                            <td data-label="Tagger" class="">
                              <span>0x07 ... 5b0e</span>
                            </td>
                            <td data-label="Publisher" class="">
                              <span>0xd6 ... bc4b</span>
                            </td>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="" class="">
                              <img
                                src="https://ipfs.infura.io/ipfs/QmSas9z2iudgDFfZc5fJzpzMYEbv5hy6LyroYQCGLtT9GW"
                                style="max-width: 75px; max-height: 75px;"
                              />
                            </td>
                            <td data-label="Asset Name" class="">
                              Dreaming Big Color Dreams
                            </td>
                            <td data-label="Project" class="">
                              KnownOriginDigitalAsset
                            </td>
                            <td data-label="Tagged" class="">
                              <span>2 days ago</span>
                            </td>
                            <td data-label="Tagger" class="">
                              <span>0x07 ... 5b0e</span>
                            </td>
                            <td data-label="Publisher" class="">
                              <span>0xd6 ... bc4b</span>
                            </td>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="" class="">
                              <img
                                src="https://ipfs.infura.io/ipfs/QmRomtVxLDmRrZG11Z6wtARQWnCChRT17VaEXPf24ykRfD/asset.webp"
                                style="max-width: 75px; max-height: 75px;"
                              />
                            </td>
                            <td data-label="Asset Name" class="">final test</td>
                            <td data-label="Project" class="">
                              KnownOriginDigitalAsset
                            </td>
                            <td data-label="Tagged" class="">
                              <span>2 days ago</span>
                            </td>
                            <td data-label="Tagger" class="">
                              <span>0x07 ... 5b0e</span>
                            </td>
                            <td data-label="Publisher" class="">
                              <span>0xd6 ... bc4b</span>
                            </td>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                        </tbody>
                        <!---->
                      </table>
                    </div>
                    <!---->
                  </div>
                </b-tab-item>
                <b-tab-item label="IPFS">
                  Coming soon...
                </b-tab-item>
                <b-tab-item label="Unstoppable domains">
                  Coming soon...
                </b-tab-item>
              </b-tabs>
            </article>
          </div>
        </div>
      </div>

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
import Footer from "../components/Footer";
import Header from "../components/Header";
import { SNAPSHOT } from "../queries";
import EthAmountSum from "../components/EthAmountSum";
import { mapGetters } from "vuex";

export default {
  name: "Hashtags",
  components: {
    EthAmountSum,
    Footer,
    Header,
  },
  data() {
    return {
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
    resetModalForm() {
      this.modalForm = {
        hashtag: null,
        nft: null,
        nftName: null,
      };
    },
    onNftSelected(nft) {
      this.modalForm.nft = nft;
      this.modalForm.nftName = nft.name;
      this.isTagModalActive = true;
    },
    mintHashtag() {
      this.$store.dispatch("mint", this.hashtagInput[0]);
    },
    async tagNft() {
      await this.$store.dispatch("tag", this.modalForm);
      this.resetModalForm();
      this.isTagModalActive = false;
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
  },
};
</script>

<style lang="scss"></style>
