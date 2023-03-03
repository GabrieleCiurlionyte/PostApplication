export default {
  methods: {
    showModalWindow(isEdit, post) {
      if (isEdit) {
        this.$store.commit("modalWindowStore/changeModalHeader", "Edit post");
        this.$store.commit("modalWindowStore/changeEditablePost", post);
        this.$store.commit("modalWindowStore/changeTitle", post.title);
        this.$store.commit("modalWindowStore/changeContent", post.body);
        this.$store.commit("modalWindowStore/changeEditMode", true);
      } else {
        this.$store.commit("modalWindowStore/changeModalHeader", "Create post");
        this.$store.commit("modalWindowStore/changeTitle", "");
        this.$store.commit("modalWindowStore/changeContent", "");
        this.$store.commit("modalWindowStore/changeEditMode", false);
      }
      this.$store.commit("modalWindowStore/changeShowModal", true);
    },

    async validateWatcher(object, errorMsg) {
        if(!object) {
          this.$store.commit("modalWindowStore/changeHasError", true);
          this.$store.commit("modalWindowStore/changeShowError", true);
          this.$store.commit("modalWindowStore/changeErrorMsg", errorMsg);
          setTimeout(() => { this.$store.commit("modalWindowStore/changeShowError", false); }, 3000);
        }
        else {
          this.$store.commit("modalWindowStore/changeHasError", false);
        }
      },
  }
};
