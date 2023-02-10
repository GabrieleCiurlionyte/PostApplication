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
        <pagination-page></pagination-page>
        <pagination-element></pagination-element>
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
    };
  },

  mounted () {
  },

  created () {
    this.getData();
  },

  computed: {
    
  },
  
  methods: {
    async getData() {
      try {
        const response = await this.$http.get(
          "http://localhost:3000/Authors/"
        );
        // JSON responses are automatically parsed.
        this.posts = response.data;
        console.log(this.posts);
      } catch (error) {
        console.log(error);
      }
    },
  },

}
</script>

<style scoped>
  
</style>