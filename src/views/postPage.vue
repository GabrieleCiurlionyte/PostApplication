<template>
  <div id="Page">

    <!--Error message-->
    <article class="message is-danger validation-msg" v-if="hasError">
      <div class="message-header">
        <p>Error</p>
        <button class="delete" aria-label="delete" @click="hasError = false"></button>
      </div>
      <div class="message-body">
        {{ errorMsg }}
      </div>
    </article>

    <!--Successfull message-->
    <article class="message is-success validation-msg" v-if="isSuccessful">
      <div class="message-header">
        <p>Success</p>
        <button class="delete" aria-label="delete" @click="isSuccessful = false"></button>
      </div>
      <div class="message-body">
        {{ successMsg }}
      </div>
    </article>

    <search-bar id="search-bar">
      <template #input-slot>
        <input class="input" type="search" placeholder="Search..." v-model.lazy.trim="searchQuery"
          @focusout="getSearchQuery(1)" @keyup.enter="getSearchQuery(1)" />
      </template>
      <template #icon-slot>
        <i class="fa-solid fa-magnifying-glass"></i>
      </template>
    </search-bar>


    <button class="button is-primary" @click="showModal = true">
      <span class="icon">
        <i class="fa-solid fa-plus"></i>
      </span>
      <span>Add new article</span>
    </button>


    <modal-window v-if="showModal" @close="showModal = false">
      <template #header>
        <h1 class="title is-3">Create new article page</h1>
      </template>

      <template #author-slot>
        <drop-down></drop-down>
      </template>

      <template #body>
        <h1>Create new article page</h1>
      </template>
    </modal-window>

    <article class="message is-info" id="no-post-message" v-if="!hasPosts">
      <div class="message-body">
        There are no posts currently... Try to add one..
      </div>
    </article>

    <h2 class="subtitle is-2"></h2>
    <template v-if="hasPosts">
      <pagination-page :posts="posts" :authors="returnsNeededAuthorIds" @rerenderArticles=getData(0)
        @unsuccessful="DisplayError($event)" @successful="SuccessfulDelete($event)"></pagination-page>
      <pagination-element @GoToNextPage="GoToNextPage()" @GoToPreviousPage="GoToPreviousPage()"
        @GoToLastPage="GoToLastPage()" @GoToFirstPage="GoToFirstPage()" :current_page="current_page"
        :last_page="last_paDangerge"></pagination-element>
    </template>


  </div>
</template>

<script>

import paginationPage from "../modules/PostPage/paginationPage.vue";
import paginationElement from "../modules/PostPage/paginationElement.vue";
import searchBar from "../common/searchBar.vue";
import pictureButton from "../common/pictureButton.vue";
import modalWindow from "../common/modalWindow.vue";
import dropDown from "../common/drop-down.vue"


export default {

  components: {
    'pagination-page': paginationPage,
    'pagination-element': paginationElement,
    'search-bar': searchBar,
    'picture-button': pictureButton,
    'modal-window': modalWindow,
    'drop-down' : dropDown,
  },

  props: [
  ],

  data() {
    return {
      posts: [],
      authors: [],
      POSTS_PER_PAGE: 4,
      current_page: 1,
      //TODO fix unsuccessfulDeletehardcoding
      last_page: 5,
      searchMode: false,
      searchQuery: "",
      showModal: false,

      hasError: false,
      errorMsg: "",

      isSuccessful: false,
      successMsg: "",

    };
  },

  mounted() {

  },

  created() {
    this.searchMode = false;
    this.getData(0);
    this.getAuthors();
  },

  computed: {
    hasPosts: function () {
      return (this.posts.length > 0 ? true : false);
    }
  },

  methods: {

    //TODO: whenever we clear the input field we go back to normal display mode or refresh page

    async getAuthors() {
      try {
        const response = await this.$http.get(
          `http://localhost:3000/Authors/`
        );
        this.authors = response.data;
        console.log(this.authors);
      } catch (error) {
        console.log(error);
      }
    },


    async getData(pageNumber) {
      try {
        const response = await this.$http.get(
          `http://localhost:3000/Articles?_page=${pageNumber}&_limit=${this.POSTS_PER_PAGE}`
        );
        this.posts = response.data;
        console.log(this.posts);
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

    DisplayError(msg) {
      this.hasError = true;
      this.errorMsg = msg;
      setTimeout(() => { this.hasError = false }, 4000);
    },

    DisplaySuccess(msg) {
      this.isSuccessful = true;
      this.successMsg = msg;
      setTimeout(() => { this.isSuccessful = false }, 4000);
    },

    SuccessfulDelete(msg) {
      this.getData(0);
      this.DisplaySuccess(msg);
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

.validation-msg {
  position: absolute;
  z-index: 999999;
  width: 60%;
  margin-left: 20vw;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>