<template>
   <div id="page">
    <h1 class="title is-1">Post detail page</h1>
    <div class="card">
        <div class="card-content">
          <div class="content">
            <h2 class="title is-2">{{post.title}}</h2>
            <h2 class="title is-2">{{post.author}}</h2>
          </div>
          <div class="media-content">
            <p class="subtitle is-4">{{post.body}}</p>
            <p class="subtitle is-4">{{post.created_at}}</p>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item">Edit</a>
            <a href="#" class="card-footer-item">Delete</a>
          </footer>
        </div>
      </div>
    

   </div>
  </template>
  
  <script>
  import articleBox from "../modules/PostPage/articleBox.vue";
  import {APICallsMixin} from "../common/Mixins/APICallsMixin";

  export default {
    components: {
        "article-box":articleBox,
    },
    mixins: [APICallsMixin],
    props: [
    ],
    data() {
      return {
        postID : this.$route.params.id,
        post : null,
        authors : null,
      }
    },
    mounted() {
    },

    created() {
        this.getData();
        this.getAuthors();
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
    .card {
        margin: auto;
        width : 85%;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
  </style>