export default {
    methods : {
        showSystemMessage(successState, messageMode){
            console.log("Show system message called");
            this.$store.commit('changeSystemMessageSuccessState', successState);
            this.$store.commit('changeSystemMessageMode', messageMode);
            this.$store.commit('changeSystemMessageShow', true);
            setTimeout(() => { this.$store.commit('changeSystemMessageShow', false); }, 3000);
        }
    }
}