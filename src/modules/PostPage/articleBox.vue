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

        <!--Edit button-->
        <button class="button is-primary">
            <span>Edit</span>
            <span class="icon is-small">
                <i class="fa-solid fa-pen"></i>
            </span>
        </button>

        <!--Delete button-->
        <button class="button is-danger">
            <span>Delete</span>
            <span class="icon is-small">
            <i class="fas fa-times"></i>
            </span>
        </button>


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