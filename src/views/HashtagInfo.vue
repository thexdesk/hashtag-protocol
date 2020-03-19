<template>
  <div>
    <Modal
      v-bind:isOpen="isModalOpen"
      v-bind:modalData="modalData"
      @onClose="closeModal"
    />
    <div class="hero">
      <Header />

      <div class="layout">
        <div class="ui segment change-segment">
          <div class="ui two column very relaxed stackable grid">
            <div class="column">
              <div class="ui form">
                <div class="field">
                  <h3 class="ui header white">Tag a Digital Asset</h3>
                  <div class="ui input">
                    <input
                      placeholder="Asset name, project name or project contract."
                    />
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
                      type="text"
                      placeholder="Search users..."
                      v-model="hashtagSearch"
                      @input="onHashtagChange"
                      @click="openHashtagList"
                    />
                    <i class="users icon"></i>

                    <ul id="hashtagList" v-show="isHashtagListOpen">
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
                  <tbody>
                    <tr v-for="(hashtag,idx) in hashtags" :key="idx">
                      <td>
                        {{ hashtag.name }}
                      </td>
                      <td>The Graph</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="eight wide column">
            <div class="ui segments">
              <div class="ui segment">
                <h3 class="ui header">Popular Hashtags</h3>
              </div>
              <div class="ui container">
                <table class="ui celled striped table change-table">
                  <tbody>
                    <tr v-for="(hashtag,idx) in hashtags" :key="idx">
                      <td>#{{ hashtag.name }}</td>
                      <td>{{ 1 }}</td>
                      <td>${{ 0 }}</td>
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
              <div class="ui container">
                <table class="ui celled striped table change-table">
                  <tbody>
                    <tr>
                      <td>0x07...4730b</td>
                      <td>12,482</td>
                      <td>123,583</td>
                      <td>$194,485</td>
                    </tr>
                    <tr>
                      <td>0x07...4730b</td>
                      <td>12,482</td>
                      <td>123,583</td>
                      <td>$194,485</td>
                    </tr>
                    <tr>
                      <td>0x07...4730b</td>
                      <td>12,482</td>
                      <td>123,583</td>
                      <td>$194,485</td>
                    </tr>
                    <tr>
                      <td>0x07...4730b</td>
                      <td>12,482</td>
                      <td>123,583</td>
                      <td>$194,485</td>
                    </tr>
                    <tr>
                      <td>0x07...4730b</td>
                      <td>12,482</td>
                      <td>123,583</td>
                      <td>$194,485</td>
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
              <div class="ui container">
                <table class="ui celled striped table change-table">
                  <tbody>
                    <tr>
                      <td>#ethereum</td>
                      <td>04/22/2019</td>
                      <td>0x07...4730b</td>
                      <td>0x04...4820a</td>
                    </tr>
                    <tr>
                      <td>#ethereum</td>
                      <td>04/22/2019</td>
                      <td>0x07...4730b</td>
                      <td>0x04...4820a</td>
                    </tr>
                    <tr>
                      <td>#ethereum</td>
                      <td>04/22/2019</td>
                      <td>0x07...4730b</td>
                      <td>0x04...4820a</td>
                    </tr>
                    <tr>
                      <td>#ethereum</td>
                      <td>04/22/2019</td>
                      <td>0x07...4730b</td>
                      <td>0x04...4820a</td>
                    </tr>
                    <tr>
                      <td>#ethereum</td>
                      <td>04/22/2019</td>
                      <td>0x07...4730b</td>
                      <td>0x04...4820a</td>
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
import { ALL_HASH_TAGS } from "../queries";

export default {
  name: "HashtagInfo",
  components: {
    Header,
    Modal
  },
  data() {
    return {
      hashtagSearch: "",
      isHashtagListOpen: false,
      filteredHashtags: [],
      isModalOpen: false,
      modalData: {}
    };
  },
  apollo: {
    hashtags: {
      query: ALL_HASH_TAGS,
      pollInterval: 300, // ms
    }
  },
  computed: mapGetters(["allHashtags"]),
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
      this.allHashtags.filter(hashtag => {
        if (
          this.hashtagSearch.toLowerCase() === hashtag.hashtag.toLowerCase()
        ) {
          alreadyExists = true;
        }
      });

      // TODO: Give an error message if alreadyExists is true
      if (alreadyExists === false) {
        this.$store.dispatch("mint", {
          newHashtag: {
            hashtag: this.hashtagSearch,
            earnings: 0,
            tagAmounts: 0
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
small {
  color: #606060;
}
.push-down {
  margin-top: 2em;
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

  border-radius: 0px !important;
}
.segment.change-segment {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}
.divider {
  color: #ffffff !important;
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
#hashtagList {
  z-index: 5;
  position: absolute;
  top: 40px;

  width: 100%;
  background-color: #eeeeee;
  border-radius: 6px;
  box-shadow: 0px 5px 15px 3px #22222230;
  li {
    padding: 0.8em;
    background: #cccccc;
    border: 1px solid #bbbbbb;
    width: auto;
    display: inline-block;
    margin: 10px 10px;
    border-radius: 6px;
  }
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
.resizeVideoContent {
  width: 50px !important;
}
</style>
