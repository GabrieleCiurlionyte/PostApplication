<template>
    <div class="box">
        <!--Use v-for to go through all of the articles-->     
        <article-box></article-box>   
    </div>
    
  </template>
  
  <script>
  
  import article_box from './articleBox'
  
  export default {
    
    name: 'app',
    components: {
    "article-box": article_box,
},
    data () {
      return {
        
      }
    }

    //TODO created lifecycle hook from api to fetch data
  }
  </script>
  
  <style scoped>
    @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
    .box {
      display: block;
      width: 90%;
      height: 70%;
      margin: auto;
    }

  </style>