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
                        v-model="tags"
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
              <template>
                <b-table :data="data" :columns="columns"></b-table>
              </template>
            </article>
          </div>
          <div class="column is-6 is-12-mobile">
            <article class="is-white notification">
              <p class="title is-5">Recently tagged assets</p>
              <template>
                <b-table :data="data" :columns="columns"></b-table>
              </template>
            </article>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="columns is-tablet is-centered">
          <div class="column is-6 is-12-mobile">
            <article class="is-white notification">
              <p class="title is-5">Top publishers</p>
              <template>
                <b-table :data="data" :columns="columns"></b-table>
              </template>
            </article>
          </div>
          <div class="column is-6 is-12-mobile">
            <article class="is-white notification">
              <p class="title is-5">Top taggers</p>
              <template>
                <b-table :data="data" :columns="columns"></b-table>
              </template>
            </article>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { TOP_TENS } from "../queries";
const names = require("@/data/names.json");

export default {
  name: "Hashtags",
  components: {
    Footer,
    Header,
    Modal,
  },
  data() {
    return {
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
      data: [
        {
          id: 1,
          first_name: "Jesse",
          last_name: "Simmons",
          date: "2016-10-15 13:43:27",
          gender: "Male",
        },
        {
          id: 2,
          first_name: "John",
          last_name: "Jacobs",
          date: "2016-12-15 06:00:53",
          gender: "Male",
        },
        {
          id: 3,
          first_name: "Tina",
          last_name: "Gilbert",
          date: "2016-04-26 06:26:28",
          gender: "Female",
        },
        {
          id: 4,
          first_name: "Clarence",
          last_name: "Flores",
          date: "2016-04-10 10:28:46",
          gender: "Male",
        },
        {
          id: 5,
          first_name: "Anne",
          last_name: "Lee",
          date: "2016-12-06 14:38:38",
          gender: "Female",
        },
      ],
      columns: [
        {
          field: "id",
          label: "ID",
          width: "40",
          numeric: true,
        },
        {
          field: "first_name",
          label: "First Name",
        },
        {
          field: "last_name",
          label: "Last Name",
        },
        {
          field: "date",
          label: "Date",
          centered: true,
        },
        {
          field: "gender",
          label: "Gender",
        },
      ],
    };
  },
  apollo: {
    hashtags: {
      query: TOP_TENS,
      pollInterval: 500, // ms
    },
    publishers: {
      query: TOP_TENS,
      pollInterval: 500, // ms
    },
    owners: {
      query: TOP_TENS,
      pollInterval: 500, // ms
    },
    recently_tagged: {
      query: TOP_TENS,
      pollInterval: 500, // ms
    },
  },
  computed: mapGetters(["digitalAssets"]),
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
