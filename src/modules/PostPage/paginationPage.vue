<template>
  <div class="box">

    <confirmation-window :class="{'is-active': showConfirmation}"
        v-if="showConfirmation"
        @CancelConfirmation="cancelConfirmation()"
        @ConfirmConfirmation="confirmConfirmation()">
        <template #text-slot>Do you really want to delete post? <br> 
        Name: {{currentDeletionPost.title}} </template>
    </confirmation-window>
    

    <!--Use v-for to go through all of the articles-->
    <article-box v-for="post in posts" :key="post.id" @deleteArticle="showConfirmationBox(post)"
      @editArticle="editArticle(post)">

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

import article_box from './articleBox';
import confirmationWindow from "../../common/confirmationWindow.vue";


export default {

  name: 'app',
  components: {
    "article-box": article_box,
    "confirmation-window": confirmationWindow,
  },
  props: ['posts', 'authors'],
  data() {
    return {
      showConfirmation: false,
      currentDeletionPost : null,
    }
  },

  computed: {

  },

  

  methods: {

    cancelConfirmation(){
      this.showConfirmation = false;
    },

    confirmConfirmation(){
      this.deleteArticle(this.currentDeletionPost.id);
      this.showConfirmation = false;
    },

    showConfirmationBox(post) {
      this.showConfirmation = true;
      this.currentDeletionPost = post;
    },

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
    editArticle: function (post) {
      this.$emit('EditArticle', post);
    },
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