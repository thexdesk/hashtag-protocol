import Vue from "vue";

Vue.mixin({
  methods: {
    /**
     * Pop a specific help text modal from the HelpModal component.
     * Called via $emit from within the component.
     *
     * @param {String} modal The name of the modal visibility boolean variable.
     * @public This is a public method
     */
    popModal(modal) {
      // Set the modal visiblity variable to true.
      // @see Buefy b-modal https://buefy.org/documentation/modal/
      this[modal] = true;
    },
  },
});
