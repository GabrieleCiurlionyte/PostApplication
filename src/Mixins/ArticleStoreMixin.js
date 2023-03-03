export default {
    methods : {
        async updateArticlesFromMixin(articles, current_page){
            this.$store.commit('articleStore/changeLastPage', await this.$requestPlugin.getPageCount());
            this.$store.commit('articleStore/updateArticles', articles);
            this.$store.commit('articleStore/changeCurrentPage', current_page);
        }
    }
}