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
        id="taginput"
        ref="taginput"
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
        <!--
        <template slot="selected" slot-scope="props">
          <div v-bind:class="{ box: isNewTag() }">
            <b-tag
              v-for="(tag, index) in props.tags"
              :key="index"
              :tabstop="false"
              ellipsis
              attached
              type="is-primary"
              size="is-medium"
              closable
              close-type="is-dark"
              @close="$refs.taginput.removeTag(index, $event)"
            >
              <div v-if="tag.displayHashtag">
                {{ tag.displayHashtag }}
              </div>
              <div v-else>#{{ tag }}</div>
            </b-tag>
            <div class="field">
              <div class="control">
                <b-button
                  type="is-primary"
                  class="is-outlined"
                  @click="mintHashtag()"
                  :disabled="!isNewTag()"
                  v-bind:class="{ 'is-hidden': !isNewTag() }"
                  >Mint token
                </b-button>
              </div>
            </div>
          </div>
        </template>
        -->
      </b-taginput>
    </b-field>
  </section>
</template>
<script>
import { FIRST_THOUSAND_HASHTAGS } from "@/queries";
import HashtagValidationService from "@/services/HashtagValidationService";
import MintModal from "./MintModal";

export default {
  name: "Hashtags",
  //props: {
  //  newHashtag: String,
  //},
  components: {},
  data() {
    return {
      newHashtag: null,
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
      this.hashtagInputTags = hashtags.filter(
        (tag) => `${tag.name.toLowerCase()}`.indexOf(text.toLowerCase()) === 1
      );
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
     * Capture the enter key and submit Hashtag for minting.
     *
     * Function to capture the input field when user hits "Enter."
     * Passes value to validateTag service and pops the
     * minting modal if it passes validation. Otherwise
     * validateTag shows toast errors.
     */
    checkIfEnterKey: function (event) {
      // User is hitting enter.
      if (event.which === 13) {
        this.newHashtag = document.getElementById("taginput").value;
        if (this.validateTag(this.newHashtag)) {
          const mintModal = this.$buefy.modal.open({
            parent: this,
            component: MintModal,
            hasModalCard: true,
            customClass: "custom-class custom-class-2",
            trapFocus: true,
            props: {
              newHashtag: this.newHashtag,
            },
          });

          this.$store.dispatch("captureOpenModalCloseFn", mintModal.close);
        }
      }
    },
    /**
     * Check if string being typed in is a new hashtag.
     *
     * Compares string being typed in against first 1000 hashtags (FIRST_THOUSAND_HASHTAGS)
     *
     * @return boolean true for new hashtag.
     * @todo make the hashtag check more dynamic.
     */
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
                .indexOf("#" + this.hashtagInput[0].toLowerCase()) >= 0
            );
          }).length === 0
        );
      }
      return false;
    },
    // Mint new hashtag button is clicked.
    mintHashtag() {
      this.$store.dispatch("mint", `#${this.hashtagInput[0]}`);
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
