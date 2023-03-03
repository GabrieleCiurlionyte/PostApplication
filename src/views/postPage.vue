<template>
  <div id="Page">

    <error-page v-if="showErrorPage"></error-page>
    <template v-if="!showErrorPage">

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

      <button class="button is-primary" @click="CreateArticle()">
        <span class="icon">
          <i class="fa-solid fa-plus"></i>
        </span>
        <span>Add new article</span>
      </button>

      <article class="message is-info" id="no-post-message" v-if="!hasPosts">
        <div class="message-body">
          There are no posts currently... Try to add one..
        </div>
      </article>

      <h2 class="subtitle is-2"></h2>
      <template v-if="hasPosts">
        <pagination-page :posts="articleStore.articles" :authors="authors" @rerenderArticles=getData(0)
          @unsuccessfulDelete="UnsuccessfulDelete()" @successfulDelete="SuccessfulDelete()"
          @EditArticle="EditArticle($event)"></pagination-page>
        <pagination-element @GoToNextPage="GoToNextPage()" @GoToPreviousPage="GoToPreviousPage()"
          @GoToLastPage="GoToLastPage()" @GoToFirstPage="GoToFirstPage()"></pagination-element>
      </template>
    </template>
  </div>
</template>

<script>

import paginationPage from "../components/Article/paginationPage.vue";
import errorPage from "./404Page.vue";
import paginationElement from "../components/Article/paginationElement.vue";
import searchBar from "../components/searchBar.vue";
import { bus } from "../main";
import systemMessageMixin from "../Mixins/systemMessageMixin";
import modalWindowMixin from "../Mixins/modalWindowMixin";
import articleStoreMixin from "../Mixins/ArticleStoreMixin";
import { mapState } from "vuex";

export default {

  components: {
    'pagination-page': paginationPage,
    'pagination-element': paginationElement,
    'search-bar': searchBar,
    'error-page': errorPage,
  },
  props: [
  ],
  data() {
    return {
      authors: [],
      POSTS_PER_PAGE: 4,

      searchMode: false,
      searchQuery: "",
      searchResults: null,

      showErrorPage: false,
    };
  },
  mixins: [systemMessageMixin, modalWindowMixin, articleStoreMixin],
  mounted() {

  },

  async created() {
    this.articleStore.lastPage = await this.$requestPlugin.getPageCount();
    this.searchMode = false;
    this.$store.commit('articleStore/updateArticles', await this.$requestPlugin.getPageData(0));
    this.authors = await this.$authorsPlugin.getAuthors();
  },

  beforeUpdate() {
    bus.$on('UpdateArticles', async () => {
      console.log("update event received to root");
      this.$store.commit('articleStore/updateArticles', await this.$requestPlugin.getPageData(0));
    });

    bus.$on('SuccessfulDeleteFromDetail', () => {
      this.SuccessfulDelete();
    });

    bus.$on('UnsuccessfulDeleteFromDetail', () => {
      this.UnsuccessfulDelete();
    });

    bus.$on('UpdateArticlesForDetailPage', async () => {
      this.$store.commit('articleStore/updateArticles', await this.$requestPlugin.getPageData(0));
    });
  },

  computed: {
    ...mapState(["modalWindowStore", "systemMessageStore", "articleStore"]),
    hasPosts() {
      return (this.articleStore.articles.length > 0 ? true : false);
    },
  },

  methods: {

    CreateArticle: function () {
      this.showModalWindow(false, null);
    },

    EditArticle: function (post) {
      this.showModalWindow(true, post);
    },


    async getSearchQuery(page) {
      if (this.searchQuery === "") {
        this.searchMode = false;
        this.$store.commit('articleStore/changeCurrentPage', 1);
        this.asyncExecuteAPICall();
      }
      else {
        try {
          this.searchMode = true;
          this.calculateSearchQueryLength();
          return this.$requestPlugin.searchQuery(this.searchQuery, page);
        } catch (error) {
          this.searchMode = false;
          console.log(error);
        }
      }

    },

    async calculateSearchQueryLength() {
      let allSearchResults = await this.$requestPlugin.getAllSearchResults(this.searchQuery);
      console.log("All search results");
      console.log(allSearchResults);
      var quotient = Math.floor(allSearchResults.length / this.POSTS_PER_PAGE);
      var remainder = allSearchResults.length  % this.POSTS_PER_PAGE;
      var pageCount = remainder == 0 ? quotient : quotient + 1;
      this.$store.commit('articleStore/changeLastPage', pageCount);
    },


    async asyncExecuteAPICall() {
      if (!(this.searchMode)) {
        this.$store.commit('articleStore/updateArticles', await this.$requestPlugin.getPageData(this.articleStore.currentPage));
      }
      else {
        this.$store.commit('articleStore/updateArticles', await this.getSearchQuery(this.articleStore.currentPage));
        ;
      }
    },

    GoToNextPage() {
      this.$store.commit('articleStore/changeCurrentPage', this.articleStore.currentPage + 1);
      this.asyncExecuteAPICall();
    },

    GoToPreviousPage() {
      if (this.articleStore.currentPage != 1) {
        this.$store.commit('articleStore/changeCurrentPage', this.articleStore.currentPage - 1);
        this.asyncExecuteAPICall();
      }
    },

    GoToFirstPage() {
      this.$store.commit('articleStore/changeCurrentPage', 1);
      this.asyncExecuteAPICall();
    },

    GoToLastPage() {
      this.$store.commit('articleStore/changeCurrentPage', this.articleStore.lastPage);
      this.asyncExecuteAPICall();
    },

    SuccessfulDelete: async function () {
      this.$store.commit('articleStore/updateArticles', await this.$requestPlugin.getPageData(0));
      this.showSystemMessage(true, "delete");
    },

    UnsuccessfulDelete: async function () {
      this.showSystemMessage(false, "delete");
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