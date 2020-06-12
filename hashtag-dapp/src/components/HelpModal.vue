<template>
  <b-tooltip label="Help" position="is-bottom" type="is-dark">
    <button class="button is-white" @click="popModal">
      <b-icon icon="help-circle-outline" type="is-dark"> </b-icon>
    </button>
  </b-tooltip>
</template>

<script>
/**
 * Popup a help / information modal.
 *
 * Pop a targeted modal in parent when
 * help icon in HelpModaltemplate is clicked.
 */
export default {
  name: "HelpModal",
  props: {
    /**
     * Name of the modal visibility boolean variable.
     * Set in parent.
     */
    modal: String,
  },
  methods: {
    /**
     * Emit the popModalFromChild event.
     */
    popModal() {
      /**
       * PopModalFromChild event.
       *
       * @event popModalFromChild
       * @param {string} modal prop value passed down from parent.
       */
      this.$emit("popModalFromChild", this.modal);
    },
  },
};
</script>
