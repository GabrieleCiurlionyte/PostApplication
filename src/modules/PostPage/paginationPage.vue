<template>
  <div class="box">
    <!--Use v-for to go through all of the articles-->
    <article-box v-for="post in posts" :key="post.id" @deleteArticle="deleteArticle(post.id)"
      @editArticle="editArticle(post.id)">
      <template #title-slot>
        <p class="title is-4">{{ post.title }}</p>
      </template>
      <template #author-slot>
        <p class="subtitle is-4">{{ authorName(post) }}</p>
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
  props: ['posts', 'authors'],
  data() {
    return {

    }
  },

  computed: {

  },

  methods: {

    authorName(post){
      let authorID = post.author;
      return this.authors.filter((author) => author.id == authorID)[0].name;
    },

    deleteArticle: async function (postID) {
      try {
        const response = await this.$http.delete(
          `http://localhost:3000/Articles/${postID}`
        );
        this.$emit('successful', 'The delete was successful!');
      } catch (error) {
        console.log(error);
        this.$emit('unsuccessful', 'Unsuccessful delete. Please try again.');
      }

    },

    editArticle: function (postID) {
      console.log("Update triggered for " + postID)
    }
  },


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