<template>
  <div id="page">
    <error-page v-if="showError"></error-page>
    <main-detail-page v-if="!showError" :post="post"></main-detail-page>
  </div>
</template>

<script>
import mainDetailPage from "../modules/DetailPage/mainDetailPage.vue";
import errorPage from "../views/404Page.vue";
export default {
  components: {
    'main-detail-page': mainDetailPage,
    'error-page' : errorPage,
  },
  props: [

  ],
  data() {
    return {
      postID : this.$route.params.id,
      post :null,
      showError : false,
    }
  },
  created() {
    this.getData();
  },
  computed: {
  },
  methods: {
    async getData() {
      try {
        const response = await this.$http.get(
          `http://localhost:3000/Articles/${this.postID}`
        );
        this.post = response.data;
        this.showError = false;
      } catch (error) {
        console.log(error);
        this.showError = true;
      }
    },
  },
}
</script>

<style scoped></style>