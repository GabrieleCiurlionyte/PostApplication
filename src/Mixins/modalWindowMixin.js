export default {
  methods: {
    showModalWindow(isEdit, post) {
      if (isEdit) {
        this.$store.commit("modalWindowStore/changeModalHeader", "Edit post");
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
    }
  }
};
