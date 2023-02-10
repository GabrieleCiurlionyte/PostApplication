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
        <pagination-page :posts="posts" ></pagination-page>
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


export default {

  components: {
    'pagination-page': paginationPage,
    'pagination-element' : paginationElement,
    'search-bar': searchBar,
  },

  props: [
  ],
  
  data () {
    return {
      posts: [],
      POSTS_PER_PAGE : 5,
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
  },

  computed: {
    
  },
  
  methods: {

    //TODO: whenever we clear the input field we go back to normal display mode or refresh page
    
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
  
</style>