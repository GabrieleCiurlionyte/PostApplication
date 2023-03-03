<template>
    <div id="container">
        <nav class="pagination" is-rounded is-small role="navigation" aria-label="pagination">
            <a class="pagination-previous" @click="GoToPreviousPage">Previous</a>
            <a class="pagination-next" @click="GoToNextPage">Next page</a>
            <ul class="pagination-list">


                <li v-if="!(articleStore.currentPage < 3)">
                    <a class="pagination-link" aria-label="Goto page 1" @click="GoToFirstPage">1</a>
                </li>

                <template v-if="articleStore.currentPage > 1">
                    <li v-if="articleStore.currentPage > 2">
                        <span class="pagination-ellipsis" v-if="!(articleStore.lastPage < 4)">&hellip;</span>
                    </li>
                    <li>
                        <a class="pagination-link" @click="GoToPreviousPage">{{ articleStore.currentPage - 1 }}</a>
                    </li>
                </template>

                <li>
                    <a class="pagination-link is-current" aria-current="page">{{
                        articleStore.currentPage
                    }}</a>
                </li>

                <li v-if="articleStore.currentPage + 1 == articleStore.lastPage">
                    <a class="pagination-link" @click="GoToNextPage">{{ articleStore.currentPage + 1 }}</a>
                </li>


                <template v-if="articleStore.currentPage < articleStore.lastPage - 1">
                    <li v-if="!(articleStore.lastPage < 3)">
                        <span class="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                        <a class="pagination-link" @click="GoToLastPage">{{ articleStore.lastPage }}</a>
                    </li>
                </template>
            </ul>
        </nav>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {

    name: 'app',
    components: {

    },
    data() {
        return {

        }
    },
    computed: {
        ...mapState(["articleStore"]),
    },

    methods: {
        GoToPreviousPage: function () {
            this.$emit('GoToPreviousPage');
        },
        GoToNextPage: function () {
            this.$emit('GoToNextPage');
        },
        GoToFirstPage: function () {
            this.$emit('GoToFirstPage');
        },
        GoToLastPage: function () {
            this.$emit('GoToLastPage');
        }
    }

}
</script>

<style scoped>
#container {
    width: 70%;
    margin-top: 2.25rem;
    margin: 1rem auto 1rem
}
</style>