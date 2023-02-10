<template>
    <div id="Page">
        <search-bar id="search-bar">
          <template #input-slot>
            <input class="input" type="search" placeholder="Search..."/>
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
      current_page : 1,
      //TODO fix hardcoding
      last_page : 5,
    };
  },

  mounted () {
  },

  created () {
    this.getData(0);
  },

  computed: {
    
  },
  
  methods: {
    //Method overloading
    async getData(pageNumber) {
      const POSTS_PER_PAGE = 5;
      try {
        const response = await this.$http.get(
          `http://localhost:3000/Articles?_page=${pageNumber}&_limit=${POSTS_PER_PAGE}`
        );
        this.posts = response.data;
        console.log(this.posts);
      } catch (error) {
        console.log(error);
      }
    },

    GoToNextPage(){
      this.current_page += 1;
      this.getData(this.current_page);
    },

    GoToPreviousPage(){
      if(this.current_page != 1){
        this.current_page -= 1;
        this.getData(this.current_page);
      }  
    },

    GoToFirstPage(){
        this.current_page = 1;
        this.getData(this.current_page);
    },

    GoToLastPage(){
        this.current_page = this.last_page;
        this.getData(this.current_page); 
    }

  },

}
</script>

<style scoped>
  
</style>