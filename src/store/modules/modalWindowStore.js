import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default{
    namespaced: true,
    state: {
        showModal: true,
        isEditable : false,
        hasError : false,
        errorMsg : "",

        //Modal window variables:
        title: "",
        author: "",
        content: "",

        //Editable post
        editablePost : null,
    },
    mutation: {
        changeShowModal(state, boolean) {
            console.log("SHow modal changed" + boolean);
            state.showModal = boolean;
        },
        changeEditMode(state, boolean) {
            console.log("Edit mode changed" + boolean);
            state.isEditable = boolean;
        },
        changeHasError(state, boolean) {
            console.log("Has error mode changed" + boolean);
            state.hasError = boolean;
        },
        changeErrorMsg(state, msg) {
            console.log("Error msg changed" + boolean);
            state.errorMsg = msg;
        }
    },
    getters : {
        hasError: state => state.hasError,
        isEditable: state => state.isEditable,
        showModal: state => state.showModal,
        errorMsg: state => state.errorMsg,
    }
}