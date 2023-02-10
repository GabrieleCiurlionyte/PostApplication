<template>
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <slot name=title-slot></slot>
            <slot name=author-slot></slot>
          </div>
        </div>
            <slot name="content-slot"></slot>
            <slot name="time-slot"></slot>
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
        margin: 0.5rem;
      }
  
    </style>