<template>
  <div>
    <post-page></post-page>
    <post-detail-page></post-detail-page>
  </div>
  
</template>

<script>
import postPage from './views/postPage.vue';
import notFoundPage from './views/404Page.vue';
import postDetailPage from './views/postDetailPage.vue';

export default {
  name: 'app',
  components:{
    "post-page": postPage,
    "not-found-page" : notFoundPage,
    "post-detail-page" : postDetailPage,
  },
  data () {
    return {
      
    }
  }
}
</script>

<style>
  @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>
