<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">

        <validation-message id="error-message" class="is-danger" v-if="modalWindowStore.showError">
          <template #button-slot><button class="delete" aria-label="delete"
              @click="changeModalWindowErrorShow(false)"></button></template>
          <template #body-slot>{{ modalWindowStore.errorMsg }}</template>
        </validation-message>
        <div class="modal-header">
          <div class="tile is-ancestor">
            <div class="tile is-12">
              <h1 class="title is-3">
                <slot name="header">
                  {{ modalWindowStore.modalHeader }}
                </slot>
              </h1>

            </div>
            <div class="tile" id="closeButton" @click="changeModalWindowShow(false)">
              <i class="fa-solid fa-x"></i>
            </div>
          </div>
        </div>
        <div class="modal-body">
          <label for="fTitle">Title:</label>
          <input v-model.trim.lazy="modalWindowStore.title" class="input is-normal" id="fTitle" type="text" minlength="1"
            placeholder="Enter your title..." required>

          <slot name="author-slot">
          </slot>
          <label for="fContent">Article Content:</label>
          <textarea v-model.trim.lazy="modalWindowStore.content" id="fContent" class="textarea"
            placeholder="Enter your content..." rows="5" minlength="1" required></textarea>

          <button class="modal-default-button button is-primary" @click="handleSubmit">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import { bus } from "../../main";
import validationMessage from "../Messages/validationMessage.vue"
import { mapState } from "vuex";
import { modalWindowStore } from "../../store/modules/modalWindowStore";
import modalWindowMixin from "../../Mixins/modalWindowMixin"
import systemMessageMixin from "../../Mixins/systemMessageMixin";
import articleStoreMixin from "../../Mixins/ArticleStoreMixin";


export default {

  name: 'modalWindow',
  components: {
    'validation-message': validationMessage,
  },
  props: ['editablePost', 'isModalEdit'],
  mixins: [systemMessageMixin, modalWindowMixin, articleStoreMixin],

  updated() {
    bus.$on('AuthorSelected', (data) => {
      this.author = data;
    });
  },
  created() {
    if(modalWindowStore.isEditable) {
      modalWindowStore.title = this.editablePost.title;
      modalWindowStore.content = this.editablePost.content;
    }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState(["modalWindowStore", "systemMessageStore", "articleStore"]),
  },

  watch: {
    'modalWindowStore.title': function () {
      console.log("Watcher activated for title" + this.modalWindowStore.title);
      this.validateWatcher(this.modalWindowStore.title, "The title field is empty!");
    },

    'modalWindowStore.author': function () {
      console.log("Watcher activated for author");
      this.validateWatcher(this.modalWindowStore.author, "Author not selected!");
    },

    'modalWindowStore.content': function () {
      console.log("Watcher activated for content");
      this.validateWatcher(this.modalWindowStore.content, "Content field is empty!");
    },
  },

  methods: {

    changeModalWindowShow(bool) {
      this.$store.commit("modalWindowStore/changeShowModal", bool);
    },

    changeModalWindowErrorShow(bool) {
      this.$store.commit("modalWindowStore/changeShowError", bool);
    },

    handleSubmit: async function () {
      if (this.modalWindowStore.isEditable) {
        await this.$requestPlugin.putArticle(this.modalWindowStore.editablePost.id, this.modalWindowStore.title, this.modalWindowStore.content, this.modalWindowStore.editablePost).catch(error => {
          this.modalWindowStore.hasError = false;
          this.modalWindowStore.showError = false;
          this.showSystemMessage(false, "edit");
        });
        this.showSystemMessage(true, "edit");
        this.modalWindowStore.showModal = false;
        if (this.$router.currentRoute.path != '/') {
          this.updateArticlesFromMixin(await this.$requestPlugin.getPageData(0), 1);
          this.$store.commit('articleStore/changeCurrentPage', 1)
          bus.$emit('UpdateArticles');
          this.$router.push({ path: '/' });
        }
        else {
          this.updateArticlesFromMixin(await this.$requestPlugin.getPageData(0), 1);
          bus.$emit('UpdateArticles');
          this.changeModalWindowShow(false);
        }
      }
      else {
        //Issues a post request if validation is correct
        this.validatePost();
        //TODO: test
        this.updateArticlesFromMixin(await this.$requestPlugin.getPageData(0), 1);
      }
    },

    validatePost: async function () {
      if (!this.modalWindowStore.title || !this.modalWindowStore.author || !this.modalWindowStore.content) {
        this.modalWindowStore.hasError = true;
        this.modalWindowStore.errorMsg = "There are empty fields!";
        this.modalWindowStore.showError = true;
      }
      if (!this.modalWindowStore.hasError) {
        await this.$requestPlugin.postArticle(this.modalWindowStore.title, this.modalWindowStore.content, this.modalWindowStore.author).catch(error => {
          this.modalWindowStore.hasError = false;
          this.modalWindowStore.showError = false;
          this.showSystemMessage(false, "create");
        });
        console.log("Successful post method call");
        this.modalWindowStore.hasError = false;
        this.changeModalWindowShow(false);
        this.showSystemMessage(true, "create");
      }
    },
    //TODO: fixed put article by adding modalWindowStore access
    //Method not called
    putRequest: async function (postID) {
      if (!this.modalWindowStore.hasError) {
        let date = new Date().toString();
        await this.$requestPlugin.putArticle(postID, this.title, this.content, this.editablePost).catch(error => {
          this.showSystemMessage(false, "edit");
        });
        this.showSystemMessage(true, "edit");
      }
    },
  },
}
</script>

<style scoped>
#error-message {
  display: absolute;
  margin-left: 0.5rem;
  margin-top: -3.12rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

#closeButton {
  position: absolute;
  margin-top: -2.5vh;
  margin-left: 70vw;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 80vw;
  margin: 0px auto;
  padding: 50px 75px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
  margin-top: 10px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>