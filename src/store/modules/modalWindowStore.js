import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    showModal: false,
    isEditable: false,

    //Error handling
    hasError: false,
    errorMsg: "",
    showError: false,

    //Modal window variables:
    modalHeader: "",
    title: "",
    author: "",
    content: "",

    //Editable post
    editablePost: null
  },
  mutations: {
    changeTitle(state, msg) {
      state.title = msg;
    },
    changeContent(state, msg) {
      state.content = msg;
    },
    changeShowModal(state, value) {
      state.showModal = value;
    },
    changeEditMode(state, value) {
      state.isEditable = value;
    },
    changeHasError(state, value) {
      state.hasError = value;
    },
    changeShowError(state, value) {
        state.showError = value;
    },
    changeErrorMsg(state, msg) {
      state.errorMsg = msg;
    },
    changeModalHeader(state, header) {
      state.modalHeader = header;
    },
    changeEditablePost(state, post) {
      state.editablePost = post;
    }
  },
  getters: {
    hasError: state => state.hasError,
    isEditable: state => state.isEditable,
    showModal: state => state.showModal,
    errorMsg: state => state.errorMsg
  },
};

