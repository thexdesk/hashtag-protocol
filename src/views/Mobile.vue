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
                    <b-field>
                      <b-taginput
                        :data="filteredTags"
                        autocomplete
                        :allow-new="true"
                        maxtags="1"
                        field="user.first_name"
                        icon="pound"
                        placeholder="Enter hashtag"
                        @typing="getFilteredTags"
                      >
                        <template slot-scope="props">
                          <strong>{{ props.option.id }}</strong
                          >: {{ props.option.user.first_name }}
                        </template>
                        <template slot="empty">
                          Unique hashtag! Press enter to begin minting.
                        </template>
                      </b-taginput>
                    </b-field>
                    <div>
                      <b-button type="is-primary" @click="tagNft()"
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
                  <b-input v-model="tagForm.hashtagId" placeholder="Hashtag ID">
                  </b-input>
                </b-field>
                <b-field>
                  <b-input v-model="tagForm.nftId" placeholder="NFT ID">
                  </b-input>
                </b-field>
                <b-field>
                  <b-input
                    v-model="tagForm.nftContract"
                    placeholder="NFT Contract"
                  >
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
                  <b-table-column field="nftId" label="NFT ID">
                    {{ props.row.nftId }}
                  </b-table-column>
                  <b-table-column field="nftContract" label="Project">
                    <eth-account :value="props.row.nftContract"></eth-account>
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
              <p class="title is-5">Top taggers</p>
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
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { TOP_TENS } from "../queries";
import Hashtag from "../components/Hashtag";
import EthAccount from "../components/EthAccount";
import EthAmount from "../components/EthAmount";
const names = require("@/data/names.json");

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
      tags: null,
      filteredTags: names,
      isSelectOnly: false,
      hashtagSearch: "",
      isHashtagListOpen: false,
      filteredHashtags: [],
      isModalOpen: false,
      modalData: {},
      tagForm: {
        hashtagId: "",
        nftId: "",
        nftContract: "",
      },
    };
  },
  apollo: {
    hashtags: {
      query: TOP_TENS,
      pollInterval: 1000, // ms
    },
    publishers: {
      query: TOP_TENS,
      pollInterval: 1000, // ms
    },
    owners: {
      query: TOP_TENS,
      pollInterval: 1000, // ms
    },
    tags: {
      query: TOP_TENS,
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
    onHashtagChange() {
      this.filterHashtags();
      if (this.hashtagSearch !== "") {
        this.isHashtagListOpen = true;
      } else {
        this.closeHashtagList();
      }
    },
    closeHashtagList() {
      this.isHashtagListOpen = false;
    },
    openHashtagList() {
      this.isHashtagListOpen = true;
    },
    filterHashtags() {},
    selectHashtag() {
      this.closeHashtagList();

      let alreadyExists = false;
      // this.hashtags.filter(hashtag => {
      //     if (
      //         this.hashtagSearch.toLowerCase() === hashtag.hashtag.toLowerCase()
      //     ) {
      //         alreadyExists = true;
      //     }
      // });

      // TODO: Give an error message if alreadyExists is true
      if (alreadyExists === false) {
        this.$store.dispatch("mint", {
          newHashtag: {
            hashtag: this.hashtagSearch,
            earnings: 0,
            tagAmounts: 0,
          },
        });
      }
    },
    tagNft() {
      this.$store.dispatch("tag", this.tagForm);
    },
    // Bulma taginput widget.
    getFilteredTags(text) {
      this.filteredTags = names.filter((option) => {
        return (
          option.user.first_name
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        );
      });
    },
  },
};
</script>

<style lang="scss"></style>
