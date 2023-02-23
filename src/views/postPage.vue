<template>
  <div id="Page">

    <system-message v-if="showSystemMessage" :isSuccessful="isSuccessfulDelete">
      <template #button-slot><button class="delete" aria-label="delete" @click="showSystemMessage = false"></button></template>
    </system-message>

    <h1 class="title is-1">Post page</h1>

    <search-bar id="search-bar">
      <template #input-slot>
        <input class="input" type="search" placeholder="Search..." v-model.lazy.trim="searchQuery"
          @focusout="getSearchQuery(1)" @keyup.enter="getSearchQuery(1)" />
      </template>
      <template #icon-slot>
        <i class="fa-solid fa-magnifying-glass"></i>
      </template>
    </search-bar>


    <button class="button is-primary" @click="CreateArticle()" >
      <span class="icon">
        <i class="fa-solid fa-plus"></i>
      </span>
      <span>Add new article</span>
    </button>


    <modal-window v-if="showModal" @close="showModal = false" :posts="posts"
      :editablePost="editableArticle"
      :isModalEdit="IsModalEdit"
      @UpdateArticles="getData(0);"
      @CloseModalWindow="showModal = false">
      <template #header id="modal-header">
        {{ modalHeader }}
      </template>

      <template #author-slot v-if="!IsModalEdit">
        <label for="author-drop-down">Select author:</label>
        <drop-down id="author-drop-down" :authors="authors">
        </drop-down>
      </template>
    </modal-window>

    <article class="message is-info" id="no-post-message" v-if="!hasPosts">
      <div class="message-body">
        There are no posts currently... Try to add one..
      </div>
    </article>

    <h2 class="subtitle is-2"></h2>
    <template v-if="hasPosts">
      <pagination-page :posts="posts" :authors="authors" @rerenderArticles=getData(0)
        @unsuccessfulDelete="UnsuccessfulDelete()" @successfulDelete="SuccessfulDelete()"
        @EditArticle="EditArticle($event)"></pagination-page>
      <pagination-element @GoToNextPage="GoToNextPage()" @GoToPreviousPage="GoToPreviousPage()"
        @GoToLastPage="GoToLastPage()" @GoToFirstPage="GoToFirstPage()" :current_page="current_page"
        :last_page="last_page"></pagination-element>
    </template>


  </div>
</template>

<script>

import paginationPage from "../modules/PostPage/paginationPage.vue";
import paginationElement from "../modules/PostPage/paginationElement.vue";
import searchBar from "../common/searchBar.vue";
import pictureButton from "../common/pictureButton.vue";
import modalWindow from "../common/modalWindow.vue";
import dropDown from "../common/drop-down.vue";
import systemMessage from "../common/systemMessage.vue";
import { APICallsMixin } from "../common/Mixins/APICallsMixin";
import { bus } from "../main";

export default {

  components: {
    'pagination-page': paginationPage,
    'pagination-element': paginationElement,
    'search-bar': searchBar,
    'picture-button': pictureButton,
    'modal-window': modalWindow,
    'drop-down' : dropDown,
    'system-message' : systemMessage,
  },

  mixins:[APICallsMixin],

  props: [
  ],

  data() {
    return {

      posts: [],
      postsCount : 0,
      authors: [],
      POSTS_PER_PAGE: 4,
      current_page: 1,

      editableArticle: null,
      //Modal window properties
      showModal: false,
      IsModalEdit : false,
      modalHeader : "Default header",
         
      searchMode: false,
      searchQuery: "",

      showSystemMessage : false,
      isSuccessfulDelete : false,

    };
  },

  mounted() {

  },

  created() {
    this.getDataCount();
    this.searchMode = false;
    this.getData(0);
    this.getAuthors();

  },

  beforeUpdate(){
    bus.$on('UpdateArticles', () => {
      console.log("update event received to root");
      this.getData(0);
    });

    bus.$on('SuccessfulDeleteFromDetail', () =>{
      this.SuccessfulDelete();
    });

    bus.$on('UnsuccessfulDeleteFromDetail', () =>{
      this.UnsuccessfulDelete();
    });

    bus.$on('UpdateArticlesForDetailPage', () =>{
      this.getData(0);
    });
  },

  computed: {

    hasPosts() {
      return (this.posts.length > 0 ? true : false);
    },

    last_page(){
      this.getDataCount();
      var quotient = Math.floor(this.postsCount/this.POSTS_PER_PAGE);
      var remainder = this.postsCount % this.POSTS_PER_PAGE;
      console.log((remainder == 0 ? quotient : quotient + 1));
      return (remainder == 0 ? quotient : quotient + 1);
    },
  },

  methods: {

    CreateArticle: function() {
      this.modalHeader = "Add article";
      this.IsModalEdit = false;
      this.showModal = true;
    },

    EditArticle: function(post){
      this.editableArticle = post;
      this.modalHeader = "Edit article";
      this.IsModalEdit = true;
      this.showModal = true;
    },
    async getDataCount(){
      try {
        const response = await this.$http.get(
          `http://localhost:3000/Articles`
        );
        this.postsCount = response.data.length;
      } catch (error) {
        console.log(error);
      }
    },

    async getSearchQuery(pageNumber) {
      if (this.searchQuery === "") {
        this.searchMode = false;
        this.current_page = 1;
        this.ExecuteAPICall();
      }
      try {
        this.searchMode = true;
        const response = await this.$http.get(
          `http://localhost:3000/Articles?q=${this.searchQuery}&_page=${pageNumber}&_limit=${this.POSTS_PER_PAGE}`
        );
        this.posts = response.data;
        this.current_page = 1;
        console.log(this.posts);
      } catch (error) {
        this.searchMode = false;
        console.log(error);
      }
    },


    ExecuteAPICall() {
      if (!(this.searchMode)) {
        this.getData(this.current_page);
      }
      else {
        this.getSearchQuery(this.current_page, this.searchQuery);
      }
    },

    GoToNextPage() {
      this.current_page += 1;
      this.ExecuteAPICall();
    },

    GoToPreviousPage() {
      if (this.current_page != 1) {
        this.current_page -= 1;
        this.ExecuteAPICall();
      }
    },

    GoToFirstPage() {
      this.current_page = 1;
      this.ExecuteAPICall();
    },

    GoToLastPage() {
      this.current_page = this.last_page;
      this.ExecuteAPICall();
    },


    SuccessfulDelete: function() {
      this.getData(0);
      this.isSuccessfulDelete = true;
      this.showSystemMessage = true; 
      setTimeout(() => { this.showSystemMessage = false }, 4000);
    },

    UnsuccessfulDelete: function() {
      this.isSuccessfulDelete = false;
      this.showSystemMessage = true; 
      setTimeout(() => { this.showSystemMessage = false }, 4000);
    }

  },

}
</script>

<style scoped>
#search-bar {
  margin-left: 1rem auto 1rem;
  padding: 5rem;
}

#no-post-message {
  margin: 5rem;
}

h1 {
  text-align: center;
}

</style>