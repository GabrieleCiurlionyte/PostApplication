<template>
    <div class="box">
        <!--Use v-for to go through all of the articles-->     
        <article-box v-for="post in posts" :key="post.id"
        @deleteArticle="deleteArticle(post.id)"
        @editArticle="editArticle(post.id)">
            <template #title-slot>
                <p class="title is-4">{{ post.title}}</p>
            </template>
            <template #author-slot>
                <p class="subtitle is-4">{{ post.author }}</p>
            </template>
            <template #time-slot>
                <p class="subtitle is-6">{{ post.created_at }}</p>
            </template>
        </article-box>   
    </div>
    
  </template>
  
  <script>

import article_box from './articleBox'
  
  export default {
    
    name: 'app',
    components: {
    "article-box": article_box,
    },
    props: ['posts','authors'],
    data () {
      return {
        
      }
    },

    methods:{
      deleteArticle: async function(postID){
        
        try {
        const response = await this.$http.delete(
          `http://localhost:3000/Articles/${postID}`
        );
        this.$emit('rerenderArticles');
      } catch (error) {
        console.log(error);
      }

      //TODO: notify user that deletion succesful

      

      },

      editArticle: function(postID){
        console.log("Update triggered for " + postID)
      }
    },

    computed(){
    }

  }
  </script>
  
  <style scoped>
    .box {
      display: block;
      width: 90%;
      height: 70%;
      margin: auto;
    }

  </style>