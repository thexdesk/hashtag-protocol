<template>
  <div class="modalWrapper" v-if="isOpen === true">
    <div class="modalContainer">
      <i class="close icon" @click="closeModal"></i>
      <div class="info">
        <div class="modalImageWrapper">
          <video
            autoplay
            class="modalImage"
            muted
            loop
            playsinline
            v-if="modalData.image.includes('.webm')"
          >
            <source
              v-bind:src="modalData.image"
              type='video/webm; codecs="vp8, vorbis"'
            />
          </video>
          <img
            v-bind:src="modalData.image"
            type="image"
            v-else
            class="modalImage"
          />
        </div>
        <div class="modalInfoContent">
          <h1>{{ modalData.name }}</h1>
          <p>KnownOrigin</p>
        </div>
      </div>
      <div class="tag">
        <h1>Tag this asset</h1>
        <p>
          Add one or more hashtags to describe this digital asset.
        </p>

        <div class="ui input push-below">
          <input
            v-model="hashtag"
            @keyup="searchHashtags"
            placeholder="Hashtag"
          />
        </div>

        <ul id="modalAssetType" v-if="isHashtagListOpen === true">
          <li v-for="h in hashtags" :key="h.id">#{{ h.hashtag }}</li>
        </ul>

        <div class="ui input push-below">
          <input placeholder="Asset Type" />
        </div>

        <div class="ui input push-below">
          <input placeholder="Token ID" />
        </div>
        <button class="ui primary button full-width">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: {
    isOpen: Boolean,
    modalData: Object
  },
  data() {
    return {
      isHashtagListOpen: false,
      hashtag: "",
      hashtags: ['cryptoart']
    };
  },
  methods: {
    closeModal() {
      this.$emit("onClose");
    },
    searchHashtags() {
      if (this.hashtag.length === 0) {
        return (this.isHashtagListOpen = false);
      }
      this.hashtags = this.allHashtags.filter(
        h => h.hashtag.toLowerCase().indexOf(this.hashtag.toLowerCase()) > -1
      );
      if (this.hashtags.length > 0) {
        this.isHashtagListOpen = true;
      }
    }
  }
};
</script>

<style lang="scss">
.push-below {
  margin-bottom: 1em;
}
.full-width {
  width: 100%;
}
.modalWrapper {
  position: fixed;
  z-index: 10;
  background-color: #33333350;

  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modalImageWrapper {
  text-align: center;
  padding: 1em 0;
  img {
    border-radius: 6px;
  }
}

.ui.input {
  width: 100%;
}

.icon.close {
  position: relative;
  left: 95%;
}

.modalContainer {
  display: flex;
  flex-direction: row;
  padding: 1em 0;

  .modalImage {
    width: 80%;
  }
  .modalInfoContent {
    padding: 1em;
    h1 {
      font-size: 1.6em;
      margin-bottom: 0;
    }
  }

  .info {
    width: 45%;
  }
  .tag {
    width: 55%;
    padding: 1em 1em 1em 0;
  }

  width: 50%;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 6px;
  -webkit-box-shadow: 0px 5px 10px -1px rgba(102, 102, 102, 1);
  -moz-box-shadow: 0px 5px 10px -1px rgba(102, 102, 102, 1);
  box-shadow: 0px 5px 10px -1px rgba(102, 102, 102, 1);
  @media (max-width: 854px) {
    width: 75%;
  }
  @media (max-width: 570px) {
    display: flex;
    flex-direction: column;

    .info,
    .tag {
      width: 100%;
      margin: 0 auto;
    }

    .tag {
      margin: 0 auto;
      width: 100%;
      padding: 1em;
    }
  }
}

.resizeVideoContent {
  width: 80% !important;
}

#modalAssetType {
  position: relative;
  background-color: #eeeeee;
  border-radius: 6px;
  padding: 1em;
  margin-bottom: 1em;

  li {
    display: inline-block;
    background-color: #cccccc;
    padding: 0.6em 0.8em;
    border: 3px solid #eeeeee;
    border-radius: 6px;
    &:not(:first-of-type) {
      margin-left: 0.4em;
    }
  }
}
</style>
