<template>
  <section>
    <b-field>
      <b-autocomplete
        placeholder='Search NFTs by name; eg "Dog"'
        icon="magnify"
        field="name"
        size="is-medium"
        :loading="isFetching"
        @select="onNftSelected"
        @typing="getAsyncData"
        :data="nameContains"
      >
        <template slot-scope="props">
          <div class="media">
            <div class="media-left">
              <img :src="props.option.metadataImageURI" width="32" />
            </div>
            <div class="media-content">
              {{ props.option.metadataName }}
              <br />
              <small
                >{{ props.option.contractName }}
                <b>{{ props.option.tokenId }}</b>
              </small>
            </div>
          </div>
        </template>
      </b-autocomplete>
    </b-field>
  </section>
</template>
<script>
import { NFTS_ASSETS_NAME_CONTAINS } from "@/queries";
import { mapGetters } from "vuex";
import debounce from "lodash/debounce";
import TxnModal from "./TxnModal";
//import TaggingModal from "./TaggingModal";

export default {
  name: "TaggingWidget",
  data() {
    return {
      nameContains: [],
      isFetching: false,
    };
  },
  computed: {
    ...mapGetters(["supportedNfts", "nftAssetCache"]),
  },
  methods: {
    getAsyncData: debounce(async function (name) {
      if (!name.length) {
        this.nameContains = [];
        return;
      }

      const { data } = await this.$apollo.query({
        query: NFTS_ASSETS_NAME_CONTAINS,
        client: "nftsClient",
        variables: {
          first: 100,
          name: name,
        },
      });

      this.nameContains = data.nameContains;
    }, 300),
    async onNftSelected(nft) {
      await this.$store.dispatch("updateTargetNft", nft);
      await this.$store.dispatch("updateTransactionState", {
        eventCode: "taggingSelectHashtag",
      });
      console.log("onNftSelected", nft);
      const taggingModal = this.$buefy.modal.open({
        parent: this,
        component: TxnModal,
        animation: "zoom-in",
        hasModalCard: true,
        width: 960,
        trapFocus: true,
      });

      this.$store.dispatch("captureOpenModalCloseFn", taggingModal.close);
    },
  },
};
</script>
