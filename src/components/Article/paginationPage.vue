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
    <article-box v-for="post in posts" :key="post.id" :post="post" @deleteArticle="showConfirmationBox(post)"
      @editArticle="editArticle(post)">
      <template #title-slot>{{ post.title }}</template>
      <template #author-slot>{{ authorName(post) }}</template>
      <template #time-slot>{{ postTime(post) }}</template>  
    </article-box>
  </div>

</template>

<script>

import ArticleBox from './articleBox.vue';
import confirmationWindow from "../Messages/confirmationWindow.vue";
import dateDisplayMixin from "../../Mixins/DateDisplayMixin";

export default {

  name: 'app',
  components: {
    "article-box": ArticleBox,
    "confirmation-window": confirmationWindow,
  },
  props: ['posts', 'authors'],
  data() {
    return {
      showConfirmation: false,
      currentDeletionPost : null,
    }
  },
  mixins : [dateDisplayMixin],
  methods: {
    cancelConfirmation(){
      this.showConfirmation = false;
    },

    async confirmConfirmation(){
      try {
              await this.$requestPlugin.deletePost(this.currentDeletionPost.id);
              this.$emit('successfulDelete');
            } catch (error) {
              console.log(error);
              this.$emit('unsuccessfulDelete');
      }
      this.showConfirmation = false;
    },
    showConfirmationBox(post) {
      this.showConfirmation = true;
      this.currentDeletionPost = post;
    },

    authorName(post){
      let authorID = post.author;
      if(this.authors.length != 0) {
        return this.authors.filter((author) => author.id == authorID)[0].name;
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