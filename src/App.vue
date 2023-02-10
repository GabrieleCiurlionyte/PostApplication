<template>
  <div>
    <post-page></post-page>
  </div>
  
</template>

<script>
import postPage from './views/postPage.vue';

export default {
  name: 'app',
  components:{
    "post-page": postPage,
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
