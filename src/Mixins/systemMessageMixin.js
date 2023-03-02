export default {
    methods : {
        showSystemMessage(successState, messageMode){
            this.$store.commit('systemMessageStore/changeSystemMessageSuccessState', successState);
            this.$store.commit('systemMessageStore/changeSystemMessageMode', messageMode);
            this.$store.commit('systemMessageStore/changeSystemMessageShow', true);
            setTimeout(() => { this.$store.commit('systemMessageStore/changeSystemMessageShow', false); }, 3000);
        }
    }
}