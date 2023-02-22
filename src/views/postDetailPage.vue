<template>
   <div id="page">


    <!--is-danger for another class-->
    <system-message class="is-success" v-if="showSystemMsg" :isSuccessful = "isDeleteSuccessful" :operationName = "deletion">
      <template #header-slot><p>Success</p></template>
      <template #button-slot><button class="delete" aria-label="delete" @click="showSystemMsg = false"></button></template>
      <template #body-slot>{{ systemMsg }}</template>
    </system-message>

    <modal-window v-if="showModal" @close="showModal = false"
      :editablePost="post"
      :isModalEdit="true">
      <template #header id="modal-header">
        Edit article: {{post.title}}
      </template>
    </modal-window>

    <confirmation-window :class = "{ 'is-active': showConfirmation }"
        v-if="showConfirmation"
        @CancelConfirmation="cancelConfirmation()"
        @ConfirmConfirmation="confirmConfirmation()">
      <template #text-slot><b>Do you really want to delete post?</b><br> 
        Name: {{post.title}} <br>
        Author: {{authorName(post)}}</template>
    </confirmation-window>
    
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
            <a href="#" class="card-footer-item" @click="showConfirmation=true">Delete</a>
          </footer>
        </div>
      </div>
    

   </div>
  </template>
  
  <script>
  import articleBox from "../modules/PostPage/articleBox.vue";
  import confirmationWindow from "../common/confirmationWindow.vue";
  import modalWindow from "../common/modalWindow.vue";
  import systemMessage from "../common/systemMessage.vue"
  import {APICallsMixin} from "../common/Mixins/APICallsMixin";
  import { AuthorCallMixin } from "../common/Mixins/AuthorCallMixin";
  import { DeleteArticleCall } from "../common/Mixins/DeleteArticleCall";

  export default {
    components: {
        "article-box":articleBox,
        "confirmation-window":confirmationWindow,
        "modal-window": modalWindow,
        "system-message" : systemMessage,
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
        showConfirmation : false,

        showSystemMsg : false,
        isDeleteSuccessful : null,
        
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
      cancelConfirmation() {
        this.showConfirmation = false;
      },
      confirmConfirmation(){
        this.deleteArticle(this.postID);
        this.$router.push({path:'/'});
      },
      deleteArticle: async function (postID) {
            try {
              const response = await this.$http.delete(
                `http://localhost:3000/Articles/${postID}`
              );
              this.showSystemMsg = true;
              this.isDeleteSuccessful = true;
            } catch (error) {
              console.log(error);
              this.showSystemMsg = false;
              this.isDeleteSuccessful = false;
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