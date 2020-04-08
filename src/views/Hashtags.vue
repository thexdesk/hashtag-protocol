<template>
  <div>
    <Modal
      :is-open="isModalOpen"
      :modal-data="modalData"
      @onClose="closeModal"
    />
    <div class="hero">
      <Header></Header>
      <div class="layout">
        <div class="ui segment change-segment">
          <div class="ui two column very relaxed stackable grid">
            <div class="column">
              <div class="ui form">
                <div class="field">
                  <h3 class="ui header white">Tag a Digital Asset</h3>
                  <div class="ui input">
                    <input
                      v-model="tagForm.hashtagId"
                      placeholder="Hashtag ID"
                    />
                  </div>
                  <div class="ui input">
                    <input v-model="tagForm.nftId" placeholder="NFT ID" />
                  </div>
                  <div class="ui input">
                    <input
                      v-model="tagForm.nftContract"
                      placeholder="NFT Contract"
                    />
                  </div>
                  <div>
                    <button @click="tagNft()">Tag</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="ui form">
                <div class="field">
                  <h3 class="ui header white">Mint a new Hashtag</h3>
                  <div class="ui left icon input">
                    <input
                      v-model="hashtagSearch"
                      type="text"
                      placeholder="Search for hashtags..."
                      @input="onHashtagChange"
                      @click="openHashtagList"
                    />
                    <i class="users icon"></i>

                    <ul v-show="isHashtagListOpen" id="hashtagList">
                      <li @click="selectHashtag">
                        {{ hashtagSearch }} -
                        <small class="emphasis">New Hashtag</small>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="ui vertical divider">
            Or
          </div>
        </div>
      </div>
    </div>
    <div class="ui container push-down">
      <div class="ui grid">
        <div class="row">
          <div class="eight wide column">
            <div class="ui segments">
              <div class="ui segment">
                <h3 class="ui header">Recently Tagged Assets</h3>
              </div>
              <div class="ui container">
                <table class="ui celled striped table change-table">
                  <thead>
                    <tr>
                      <th>
                        NFT ID
                      </th>
                      <th>
                        NFT Contract
                      </th>
                      <th>
                        Hashtag ID
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(tag, idx) in tags" :key="idx">
                      <td>
                        {{ tag.nftId }}
                      </td>
                      <td>{{ tag.nftContract }}</td>
                      <td>
                        <b>{{ tag.hashtagId }}</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="eight wide column">
            <div class="ui segments">
              <div class="ui segment">
                <h3 class="ui header">Newest Hashtags</h3>
              </div>
              <div v-if="hashtags" class="ui container">
                <table class="ui celled striped table change-table">
                  <thead>
                    <th>Hashtag ID</th>
                    <th>Hashtag</th>
                    <th>Minted</th>
                    <th>Owner</th>
                    <th>Publisher</th>
                  </thead>
                  <tbody>
                    <tr v-for="hashtag in hashtags" :key="hashtag.name">
                      <td>
                        <b>{{ hashtag.id }}</b>
                      </td>
                      <td>
                        <b>#{{ hashtag.name }}</b>
                      </td>
                      <td>
                        {{
                          new Date(hashtag.timestamp * 1000) | moment("from")
                        }}
                      </td>
                      <td>{{ hashtag.owner | shortEth }}</td>
                      <td>{{ hashtag.publisher | shortEth }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ui container push-down">
      <div class="ui grid">
        <div class="row">
          <div class="eight wide column">
            <div class="ui segments">
              <div class="ui segment">
                <h3 class="ui header">Top Publishers</h3>
              </div>
              <div v-if="publishers" class="ui container">
                <table class="ui celled striped table change-table">
                  <thead>
                    <th>Publisher</th>
                    <th>Tag Count</th>
                    <th>Earnings</th>
                  </thead>
                  <tbody>
                    <tr v-for="publisher in publishers" :key="publisher.id">
                      <td>{{ publisher.id | shortEth }}</td>
                      <td>{{ publisher.tagCount }}</td>
                      <td>x ETH</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="eight wide column">
            <div class="ui segments">
              <div class="ui segment">
                <h3 class="ui header">Top Owners</h3>
              </div>
              <div v-if="owners" class="ui container">
                <table class="ui celled striped table change-table">
                  <thead>
                    <th>Owner</th>
                    <th>Hashtags</th>
                    <th>Earnings</th>
                  </thead>
                  <tbody>
                    <tr v-for="owner in owners" :key="owner.id">
                      <td>{{ owner.id | shortEth }}</td>
                      <td>{{ owner.ownedCount }}</td>
                      <td>x ETH</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { TOP_TENS } from "../queries";

export default {
  name: "Hashtags",
  components: {
    Header,
    Modal,
  },
  data() {
    return {
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
    tags: {
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
  },
};
</script>

<style lang="scss">
small {
  color: #606060;
}

.push-down {
  margin-top: 2em;
}

th {
  font-size: 0.9rem;
  color: gray !important;
  font-weight: normal !important;
}

.segment.remove-padding {
  padding: 0 !important;

  thead tr th {
    border-bottom: none !important;
  }
}

.table.change-table {
  border-bottom: none !important;
  border-left: none !important;
  border-right: none !important;
  border-radius: 0 !important;
}

.segment.change-segment {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.divider {
  color: #fff !important;
}

.layout {
  width: 90%;
  margin: 0 auto;
}

.layout.containers {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.hero {
  background-color: #bdbdbb;
  height: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.input-groups {
  width: 95%;
  margin: 0 auto;
  display: flex;
}

header {
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  height: 10vh;
  padding: 1.6em;

  h1 {
    font-weight: bold;
    font-size: 1.4em;
    margin: 0;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      background-color: #f5f5f5;
      border-radius: 6px;
      padding: 0.6em 1.2em;
      display: inline-block;

      &:not(:last-of-type) {
        margin-right: 1.2em;
      }
    }
  }
}

#hashtagList {
  z-index: 5;
  position: absolute;
  top: 40px;
  width: 100%;
  background-color: #eee;
  border-radius: 6px;
  box-shadow: 0 5px 15px 3px #22222230;

  li {
    padding: 0.8em;
    background: #ccc;
    border: 1px solid #bbb;
    width: auto;
    display: inline-block;
    margin: 10px 10px;
    border-radius: 6px;
  }
}

.resizeVideoContent {
  width: 50px !important;
}
</style>
