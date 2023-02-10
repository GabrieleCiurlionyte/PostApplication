<template>
    <div id="Page">
        <search-bar id="search-bar">
          <template #input-slot>
            <input class="input" type="search" placeholder="Search..."
            v-model.lazy.trim="searchQuery"
            @focusout="getSearchQuery(1)"
            @keyup.enter="getSearchQuery(1)"
            />
          </template>
          <template #icon-slot>
            <i class="fa-solid fa-magnifying-glass"></i>
          </template>
        </search-bar>

        <picture-button>
          <template #icon-slot>
            <i class="fa-solid fa-plus"></i>
          </template>
          <template #text-slot>
            <span>Add new article</span>
          </template>
        </picture-button>

        <pagination-page :posts="posts" :authors="returnsNeededAuthorIds"></pagination-page>
        <pagination-element @GoToNextPage="GoToNextPage()"
                            @GoToPreviousPage="GoToPreviousPage()"
                            @GoToLastPage="GoToLastPage()"
                            @GoToFirstPage="GoToFirstPage()"
                            :current_page="current_page"
                            :last_page="last_page"></pagination-element>
    </div>
</template>

<script>

import paginationPage from "../modules/PostPage/paginationPage.vue";
import paginationElement from "../modules/PostPage/paginationElement.vue";
import searchBar from "../common/searchBar.vue";
import pictureButton from "../common/pictureButton.vue";


export default {

  components: {
    'pagination-page': paginationPage,
    'pagination-element' : paginationElement,
    'search-bar': searchBar,
    'picture-button': pictureButton,
  },

  props: [
  ],
  
  data () {
    return {
      posts: [],
      authors: [],
      POSTS_PER_PAGE : 4,
      current_page : 1,
      //TODO fix hardcoding
      last_page : 5,
      searchMode : false,
      searchQuery : ""
    };
  },

  mounted () {
    
  },

  created () {
    this.searchMode = false;
    this.getData(0);
    this.getAuthors();
  },

  computed: {
    //Construct a method to extract all the author id's from posts object
    returnSetOfIDS: function(){
      let authorIDS = [];
      for(let post of this.posts){
        authorIDS.push(post.author);
      }
      console.log("AUTHOR IDS");
      console.log(authorIDS);
      return authorIDS;
    },

    constructAuthorRequestString: function(){
      const baseURL = "http://localhost:3000/Authors?"
      for(i = 0; i < this.POSTS_PER_PAGE; i++) {
        baseURL.concat(`id=${this.authorIDS[i]}&`);
      }
      return baseURL.slice(0,-1);
    }


  },
  
  methods: {

    //TODO: whenever we clear the input field we go back to normal display mode or refresh page

    async getAuthors() {
      try {
        const response = await this.$http.get(
          this.constructAuthorRequestString
        );
        this.authors = response.data;
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
      if(this.searchQuery === ""){
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
      if(!(this.searchMode))
      {
        this.getData(this.current_page);
      }
      else
      {
        this.getSearchQuery(this.current_page, this.searchQuery);
      }
    },

    GoToNextPage(){
      this.current_page += 1;
      this.ExecuteAPICall();
    },

    GoToPreviousPage(){
      if(this.current_page != 1){
        this.current_page -= 1;
        this.ExecuteAPICall();
      }  
    },

    GoToFirstPage(){
        this.current_page = 1;
        this.ExecuteAPICall();
    },

    GoToLastPage(){
        this.current_page = this.last_page;
        this.ExecuteAPICall();
    }

  },

}
</script>

<style scoped>
  #search-bar {
    margin-left : 1rem auto 1rem;
    padding : 5rem;
  }
  
</style>