<template>
  <div class="body">
    <section class="hero has-background-grey-dark is-bold">
      <div class="hero-head">
        <div class="container">
          <Header></Header>
        </div>
      </div>
    </section>
    <section class="main" v-if="tagsByDigitalAsset">
      <div class="container">
        <h1 class="title is-1">{{ tagsByDigitalAsset[0].nftName }}</h1>
        <h2 class="subtitle">ERC-721 Digital asset</h2>
        <div class="tile is-ancestor">
          <div class="tile is-horizontal">
            <div class="tile is-parent is-6 is-12-mobile">
              <div class="tile is-child box">
                <help-modal
                  modal="isNewHashtagsModalActive"
                  @popModalFromChild="popModal"
                  class="is-pulled-right"
                ></help-modal>
                <div class="card">
                  <div class="card-image">
                    <figure class="image">
                      <img
                        :src="tagsByDigitalAsset[0].nftImage"
                        :alt="tagsByDigitalAsset[0].nftName"
                      />
                    </figure>
                  </div>
                  <div class="card-content">
                    <h2 class="title is-4">Asset information</h2>
                    <div class="b-table">
                      <div class="table-wrapper">
                        <table class="table">
                          <tbody>
                            <tr draggable="false" class="">
                              <td class="has-text-weight-bold">Name</td>
                              <td>
                                {{ tagsByDigitalAsset[0].nftName }}
                              </td>
                            </tr>
                            <tr draggable="false" class="">
                              <td class="has-text-weight-bold">Project</td>
                              <td>
                                {{ tagsByDigitalAsset[0].nftContractName }}
                              </td>
                            </tr>
                            <tr draggable="false" class="">
                              <td class="has-text-weight-bold">Asset Id</td>
                              <td>
                                {{ tagsByDigitalAsset[0].nftId }}
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
            <div class="tile is-parent is-6 is-12-mobile">
              <div class="tile is-child box">
                <article class="tile is-child box">
                  <help-modal
                    modal="isTaggingModalActive"
                    @popModalFromChild="popModal"
                    class="is-pulled-right"
                  ></help-modal>
                  <p class="title is-5">
                    Tag this asset
                  </p>
                  <form>
                    <div class="field">
                      <div class="control">
                        <b-taginput
                          v-model="hashtag"
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
                  <hr />
                  <help-modal
                    modal="isRecentTagsModalActive"
                    @popModalFromChild="popModal"
                    class="is-pulled-right"
                  ></help-modal>
                  <h2 class="title is-5">Recent tags</h2>
                  <div class="b-table">
                    <!---->
                    <!---->
                    <div class="table-wrapper has-mobile-cards">
                      <table tabindex="0" class="table is-hoverable">
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
                          <tr
                            draggable="false"
                            v-for="tag in tagsByDigitalAsset"
                            v-bind:key="tag.id"
                          >
                            <!---->
                            <!---->
                            <td data-label="Hashtag" class="">
                              <span class="has-text-weight-bold">
                                <hashtag :value="tag.hashtagName"></hashtag>
                              </span>
                            </td>
                            <td data-label="Minted" class="">
                              <timestamp-from
                                :value="tag.timestamp"
                              ></timestamp-from>
                            </td>
                            <td data-label="Owner" class="">
                              <eth-account
                                :value="tag.tagger"
                                route="owner-detail"
                              ></eth-account>
                            </td>
                            <td data-label="Publisher" class="">
                              <eth-account
                                :value="tag.publisher"
                                route="owner-detail"
                              ></eth-account>
                            </td>
                            <!---->
                          </tr>
                        </tbody>
                        <!---->
                      </table>
                    </div>
                    <!---->
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
      <b-modal :active.sync="isTaggingModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Tag an asset</p>
              </div>
            </div>
            <div class="content">
              <p>Copy tbd</p>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal
        :active.sync="isRecentTagsModalActive"
        :width="640"
        scroll="keep"
      >
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Recent tags</p>
              </div>
            </div>
            <div class="content">
              <p>
                A listing of Hashtags this asset has been recently tagged with.
              </p>
            </div>
          </div>
        </div>
      </b-modal>
    </section>
    <section v-else>
      Loading...
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Header from "../components/Header";
import HelpModal from "../components/HelpModal";
import { SNAPSHOT, TAGS_BY_DIGITAL_ASSET } from "../queries";
import Hashtag from "../components/Hashtag";
import EthAccount from "../components/EthAccount";
import TimestampFrom from "../components/TimestampFrom";

export default {
  name: "NftDetail",
  components: {
    TimestampFrom,
    EthAccount,
    Hashtag,
    Footer,
    Header,
    HelpModal,
  },
  data() {
    return {
      activeTab: null,
      isTaggingModalActive: false,
      isRecentTagsModalActive: false,
      name: this.$route.params.name,
      type: this.$route.params.type,
      contract: this.$route.params.contract,
      id: this.$route.params.id,
      tagsByHashtag: null,
      hashtagsByName: null,
      hashtag: null,
      hashtags: null,
      hashtagInputTags: [],
    };
  },
  computed: {
    isTaggable() {
      return this.hashtag;
    },
  },
  apollo: {
    tagsByDigitalAsset: {
      query: TAGS_BY_DIGITAL_ASSET,
      variables() {
        return {
          nftContract: this.contract,
          nftId: this.id,
        };
      },
    },
    hashtags: {
      query: SNAPSHOT,
      pollInterval: 1000, // ms
    },
  },
  methods: {
    async tagNft() {
      await this.$store.dispatch("tag", {
        hashtagId: this.hashtag[0].id,
        nftContract: this.tagsByDigitalAsset[0].nftContract,
        nftId: this.tagsByDigitalAsset[0].nftId,
      });
    },
    // Bulma taginput widget.
    getFilteredTags: function (text) {
      this.hashtagInputTags = (this.hashtags || []).filter((option) => {
        return option.name.toLowerCase().indexOf(text.toLowerCase()) === 0;
      });
    },
  },
};
</script>

<style lang="scss"></style>
