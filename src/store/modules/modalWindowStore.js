import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default{
    namespaced: true,
    state: {
        showModal: false,
        isEditable : false,
        modalHeader : "",
        hasError : false,
        errorMsg : "",

        //Modal window variables:
        title: "",
        author: "",
        content: "",

        //Editable post
        editablePost : null,
    },
    mutations: {
        changeTitle(state, msg) {
            state.title = msg;
        },
        changeContent(state, msg) {
            state.content = msg;
        },
        changeShowModal(state, value) {
            console.log("SHow modal changed" + value);
            state.showModal = value;
        },
        changeEditMode(state, value) {
            console.log("Edit mode changed" + value);
            state.isEditable = value;
        },
        changeHasError(state, value) {
            console.log("Has error mode changed" + value);
            state.hasError = value;
        },
        changeErrorMsg(state, msg) {
            console.log("Error msg changed" + msg);
            state.errorMsg = msg;
        },
        changeModalHeader(state, header) {
            state.modalHeader = header;
        },
        changeEditablePost(state, post) {
            console.log("Changed editable post" + post.postID);
            state.editablePost = post;
        }
    },
    getters : {
        hasError: state => state.hasError,
        isEditable: state => state.isEditable,
        showModal: state => state.showModal,
        errorMsg: state => state.errorMsg,
    }
}