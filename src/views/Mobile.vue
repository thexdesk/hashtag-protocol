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
                          {{ props.option.name }}
                          <em>existing {{ props.option.tagCount }} tags</em>
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
                      {{ props.option.name }}
                      <em>{{ props.option.tagCount }} tags</em>
                    </template>
                  </b-taginput>
                </b-field>
                <b-field>
                  <b-select
                    placeholder="Select a NFT Contract"
                    v-model="tagForm.nftContract"
                    expanded
                  >
                    <option
                      v-for="option in supportedNfts"
                      :value="option.contractAddress"
                      :key="option.contractAddress"
                    >
                      {{ option.name }}
                    </option>
                  </b-select>
                </b-field>
                <b-field>
                  <b-input v-model="tagForm.nftId" placeholder="NFT ID">
                  </b-input>
                </b-field>
                <div>
                  <b-button type="is-primary" @click="tagNft()"
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
                  <b-table-column field="tagCount" label="Tag count" centered>
                    {{ props.row.tagCount }}
                  </b-table-column>
                  <b-table-column field="mintFess" label="Mint earnings">
                    <eth-amount :value="props.row.mintFees"></eth-amount>
                  </b-table-column>
                  <b-table-column field="registryFees" label="Tag earnings">
                    <eth-amount :value="props.row.registryFees"></eth-amount>
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
                  <b-table-column field="id" label="Publisher">
                    <eth-account :value="props.row.id"></eth-account>
                  </b-table-column>
                  <b-table-column field="ownedCount" label="Tag count" centered>
                    {{ props.row.ownedCount }}
                  </b-table-column>
                  <b-table-column field="registryFees" label="Tag earnings">
                    <eth-amount :value="props.row.registryFees"></eth-amount>
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
                  <b-table-column field="tagCount" label="Tag count" centered>
                    {{ props.row.tagCount }}
                  </b-table-column>
                </template>
              </b-table>
            </article>
          </div>
          <div class="column is-6 is-12-mobile">
            <article class="is-white notification">
              <p class="title is-5">Top taggers</p>
            </article>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
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
import { mapGetters } from "vuex";

export default {
  name: "Hashtags",
  components: {
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
        hashtag: "",
        nftId: "",
        nftContract: "",
      },
    };
  },
  computed: mapGetters(["supportedNfts"]),
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
        return option.name.toLowerCase().indexOf(text.toLowerCase()) >= 0;
      });
    },
    isNewTag: function () {
      return (
        this.hashtagInput &&
        Array.isArray(this.hashtagInput) &&
        (typeof this.hashtagInput[0] === "string" ||
          this.hashtagInput[0] instanceof String)
      );
    },
  },
};
</script>

<style lang="scss"></style>
