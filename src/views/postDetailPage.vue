<template>
   <div id="page">

    <modal-window v-if="showModal" @close="showModal = false"
      :editablePost="post"
      :isModalEdit="true">
      <template #header id="modal-header">
        Edit article: {{post.title}}
      </template>
    </modal-window>

    <h1 class="title is-1">Post detail page</h1>
    <div class="card">
        <div class="card-content">
          <div class="content">
            <h2 class="title is-2">{{post.title}}</h2>
            <h2 class="title is-2">{{authorName(post)}}</h2>
          </div>
          <div class="media-content">
            <p class="subtitle is-4">{{post.body}}</p>
            <p class="subtitle is-4">{{post.created_at}}</p>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item" @click="showModal=true">Edit</a>
            <a href="#" class="card-footer-item">Delete</a>
          </footer>
        </div>
      </div>
    

   </div>
  </template>
  
  <script>
  import articleBox from "../modules/PostPage/articleBox.vue";
  import confirmationWindow from "../common/confirmationWindow.vue";
  import modalWindow from "../common/modalWindow.vue"
  import {APICallsMixin} from "../common/Mixins/APICallsMixin";
  import { AuthorCallMixin } from "../common/Mixins/AuthorCallMixin";
  import { DeleteArticleCall } from "../common/Mixins/DeleteArticleCall";

  export default {
    components: {
        "article-box":articleBox,
        "confirmation-window":confirmationWindow,
        "modal-window": modalWindow
    },
    mixins: [APICallsMixin, AuthorCallMixin, DeleteArticleCall],
    props: [
    ],
    data() {
      return {
        postID : this.$route.params.id,
        post : null,
        authors : null,

        showModal : false,
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