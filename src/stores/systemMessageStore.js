import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        showSystemMessage : true,
        isSystemMessageSuccessful : true,

        //TODO: implement
        systemMessageMode : "delete",
        //possible array: delete, edit, create
    },
    mutations: {

        changeSystemMessageShow(state, boolean) {
            state.showSystemMessage = boolean;
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

})


function checkValidMode(string) {
    return (string == "delete" || 
            string == "edit" ||
            string == "create" ? true : false);
}