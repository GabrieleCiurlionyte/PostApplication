<template>
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">Name: book name</p>
            <p class="subtitle is-4">Author: author name</p>
          </div>
        </div>
  
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus nec iaculis mauris.
          <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
        </div>
    </div>       
  </template>
    
    <script>
    export default {
      name: 'app',
      data () {
        return {
          
        }
      }
    }
    </script>
    
    <style scoped>
    
    .card {
        margin-left: 0.7rem;
      }
  
      .content {
        margin-left: 1rem;
      }
    </style>