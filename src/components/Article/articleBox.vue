<template>
  <div class="card">

    <router-link v-bind:to="'/detailPage/'+post.id">
    <div class="card-content" >

      <div class="media">
        <div class="media-content">
          <p class="title is-4"><slot name=title-slot></slot></p>
          <p class="subtitle is-4"><slot name=author-slot></slot></p>
        </div>
      </div>

      <p class="subtitle is-6"><slot name="content-slot"></slot></p>
      <p class="subtitle is-6"><slot name="time-slot"></slot></p>
    </div>
    </router-link>

    
    <!--Edit button-->
    <button class="button is-primary" @click="editArticle">
      <span>Edit</span>
      <span class="icon is-small">
        <i class="fa-solid fa-pen"></i>
      </span>
    </button>

    <!--Delete button-->
    <button class="button is-danger" @click="deleteArticle">
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
  data() {
    return {

    }
  },
  props:['post'],

  methods: {
    deleteArticle: function () {
      this.$emit('deleteArticle');
    },
    editArticle: function () {
      this.$emit('editArticle');
    }
  }
}
</script>

<style scoped>
.card {
  margin: 0.5rem;
}
</style>