<template>
    <div id="container">
        <nav class="pagination" is-rounded is-small role="navigation" aria-label="pagination">
            <a class="pagination-previous" @click="GoToPreviousPage">Previous</a>
            <a class="pagination-next" @click="GoToNextPage">Next page</a>
            <ul class="pagination-list">


                <li v-if="!(current_page < 3)">
                    <a class="pagination-link" aria-label="Goto page 1" @click="GoToFirstPage">1</a>
                </li>

                <template v-if="current_page > 1">
                    <li v-if="current_page > 2">
                        <span class="pagination-ellipsis" v-if="!(last_page < 4)">&hellip;</span>
                    </li>
                    <li>
                        <a class="pagination-link" @click="GoToPreviousPage">{{ current_page - 1}}</a>
                    </li>
                </template>

                <li>
                    <a class="pagination-link is-current" :aria-label="current_page" aria-current="page">{{
                        current_page
                    }}</a>
                </li>

                <li v-if="current_page + 1 == last_page">
                    <a class="pagination-link" @click="GoToNextPage">{{ current_page + 1 }}</a>
                </li>


                <template v-if="current_page < last_page - 1">
                    <li v-if="!(last_page < 3)">
                        <span class="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                        <a class="pagination-link" @click="GoToLastPage">{{ last_page }}</a>
                    </li>
                </template>
            </ul>
        </nav>
    </div>

</template>

<script>

export default {

    name: 'app',
    components: {

    },
    props: ["current_page", "last_page"],

    data() {
        return {

        }
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