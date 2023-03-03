import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default{
    namespaced: true,
    state: {
        showSystemMessage : false,
        isSystemMessageSuccessful : true,
        //possible array: delete, edit, create
        systemMessageMode : "delete",
        
    },
    mutations: {
        changeSystemMessageShow(state, value) {
            state.showSystemMessage = value;
            console.log("statechanged" + state.showSystemMessage);
        },
        changeSystemMessageSuccessState(state, boolean) {
            state.selectSystemMessageMode = boolean;
        },
        changeSystemMessageMode(state, string) {
            if(checkValidMode(string)) {
                state.systemMessageMode = string;
            }
            else {
                console.log("Invalid message mode selected");
            }
        } 
    },
}

function checkValidMode(string) {
    return (string == "delete" || 
            string == "edit" ||
            string == "create" ? true : false);
}