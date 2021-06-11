<template>
  <section class="hashtag-mint">
    <b-field v-if="hashtags">
      <b-taginput
        v-model="hashtagInput"
        :data="hashtagInputTags"
        attached
        autocomplete
        :allow-new="false"
        maxtags="1"
        field="name"
        id="mint-hashtag"
        ref="mint-hashtag"
        icon="pound"
        size="is-medium"
        :has-counter="false"
        :clear-on-select="true"
        placeholder="Enter hashtag"
        :before-adding="selectExistingTag"
        @typing="getFilteredTags"
        @keyup.native="checkIfEnterKey"
      >
        <template slot-scope="props">
          <b-taglist attached>
            <b-tag type="is-primary" size="is-medium"
              >{{ props.option.displayHashtag }}
            </b-tag>
            <b-tag type="is-dark" size="is-medium"
              >{{ props.option.tagCount }}
            </b-tag>
          </b-taglist>
        </template>
        <template slot="empty">
          <span class="new-hashtag"
            >Unique HASHTAG! Press enter to continue...</span
          >
        </template>
      </b-taginput>
    </b-field>
  </section>
</template>
<script>
import { FIRST_THOUSAND_HASHTAGS } from "@/queries";
import HashtagValidationService from "@/services/HashtagValidationService";
import TxnModal from "./TxnModal";

export default {
  name: "Mint",
  data() {
    return {
      hashtagInput: null,
      hashtagInputTags: [],
    };
  },
  apollo: {
    hashtags: {
      query: FIRST_THOUSAND_HASHTAGS,
      pollInterval: 1000, // ms
    },
  },
  methods: {
    getFilteredTags: function (text) {
      const hashtags = this.hashtags || [];
      this.hashtagInputTags = hashtags.filter((tag) => {
        return `${tag.name.toLowerCase()}`.indexOf(text.toLowerCase()) === 1;
      });
    },
    /**
     * Function to handle when user selects existing tag in minting widget.
     *
     * Will return a toast error that the tag is already minted.
     */
    selectExistingTag: function (tag) {
      this.validateTag(tag.hashtagWithoutHash);
    },
    /**
     * Capture the enter key and pop the transaction modal.
     *
     * Function to capture the input field when user hits "Enter."
     * Passes value to validateTag service and pops the
     * transaction modal if it passes validation. Otherwise
     * validateTag shows toast errors.
     */
    async checkIfEnterKey(event) {
      // User is hitting enter.
      if (event.which === 13) {
        const newHashtag = document.getElementById("mint-hashtag").value;
        console.log("checkIfEnterKey", newHashtag);
        if (this.validateTag(newHashtag)) {
          // This is a valid, new hashtag, update the application.
          await this.$store.dispatch("updateNewHashtag", newHashtag);
          await this.$store.dispatch("updateProtocolAction", "mintHashtag");
          // Web3 txn state.
          await this.$store.dispatch("updateTransactionState", {
            eventCode: "mintConfirm",
          });
          const mintModal = await this.$buefy.modal.open({
            parent: this,
            component: TxnModal,
            animation: "zoom-in",
            hasModalCard: true,
            trapFocus: true,
          });

          this.$store.dispatch("captureOpenModalCloseFn", mintModal.close);
        }
      }
    },
    validateTag(hashtag) {
      return this.hashtagValidationService.validateTag(hashtag, this.hashtags);
    },
  },
  created() {
    this.hashtagValidationService = new HashtagValidationService(
      this.$buefy.toast
    );
  },
};
</script>
