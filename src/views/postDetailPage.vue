<template>
   <div id="page">
    <h1 class="title is-1">Post detail page</h1>

    <article-box>
        <template #title-slot>Title</template>
        <template #author-slot>Author</template>
        <template #content-slot>Content</template>
        <template #time-slot>Date</template>
    </article-box>

   </div>
  </template>
  
  <script>
  import articleBox from "../modules/PostPage/articleBox.vue";

  export default {
    components: {
        "article-box":articleBox,
    },
    props: [
    ],
    data() {
      return {
      }
    },
    mounted() {
    },
    created() {
    },
    computed: {
    },
    methods: {
    },
    watch: {
    }
  }
  </script>
  
  <style scoped>
    h1 {
        text-align: center;
    }
  </style>