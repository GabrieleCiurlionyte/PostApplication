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

  export default {
    components: {
        "article-box":articleBox,
    },
    props: [
    ],
    data() {
      return {
        postID : this.$route.params.id,
        post : null,
      }
    },
    mounted() {
    },

    created() {
        this.getData();
    },

    computed: {
    },
    methods: {
        async getData() {
        try {
            const response = await this.$http.get(
            `http://localhost:3000/Articles/${this.postID}`
            );
            this.post = response.data;
            console.log(this.post);
        } catch (error) {
            console.log(error);
        }
    },
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