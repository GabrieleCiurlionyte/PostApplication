<template>
    <div class="box">
        <!--Use v-for to go through all of the articles-->     
        <article-box v-for="post in posts" :key="post.id">
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