<template>
    <div id="page">
  
     <modal-window v-if="showModal" @close="showModal = false"
       :editablePost="post"
       :isModalEdit="true"
       >
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
         Author: {{ authorName }}</template>
     </confirmation-window>
     
     <h1 class="title is-1">Post detail page</h1>
     <div class="card">
         <div class="card-content">
           <div class="content">
             <h2 class="title is-2">{{post.title}}</h2>
             <h2 class="title is-2">{{ $authorsPlugin.getAuthorName(post) }}</h2>
           </div>
           <div class="media-content">
             <p class="subtitle is-4">{{post.body}}</p>
             <p class="subtitle is-4">{{ postTime(post)}}</p>
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
   import articleBox from "../../components/Article/articleBox.vue"
   import confirmationWindow from "../Messages/confirmationWindow.vue";
   import modalWindow from "../Messages/modalWindow.vue";
   import systemMessage from "../Messages/systemMessage.vue"
   import systemMessageMixin from "../../Mixins/systemMessageMixin";
   import dateDisplayMixin from "../../Mixins/DateDisplayMixin";
   import { bus } from "../../main";
  
   export default {
     components: {
         "article-box":articleBox,
         "confirmation-window":confirmationWindow,
         "modal-window": modalWindow,
         "system-message" : systemMessage,
     },
     mixins: [systemMessageMixin, dateDisplayMixin],
     props: ['post'],
     data() {
       return {
         showModal : false,
         showConfirmation : false,
         authors : null,
         authorName : "defaultAuthorName",
       }
     },
     created() {
      this.authors = this.$authorsPlugin.getAuthors();
     },
     beforeMount(){
      this.authorName = this.$authorsPlugin.getAuthorName(post);
      console.log("Before mount hook called.");
     },
     computed: {
     },
     methods: {
       cancelConfirmation() {
         this.showConfirmation = false;
       },
       confirmConfirmation(){
        try{
          this.deleteArticle(this.post.id);
        }
        catch(error) {
          this.showSystemMessage(false, "delete");
        }
        this.showSystemMessage(true, "delete");
         bus.$emit("UpdateArticlesForDetailPage");
         this.$router.push({path:'/'});
       },
       deleteArticle: async function (postID) {
             try {
               await this.$requestPlugin.deletePost(postID);
               console.log(`Deleted post ${postiD}`);
               bus.$emit("SuccessfulDeleteFromDetail");
             } catch (error) {
               console.log(error);
               console.log(`Unsuccessful delete: post ${postiD}`);
               bus.$emit("UnsuccessfulDeleteFromDetail");
               throw error;
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