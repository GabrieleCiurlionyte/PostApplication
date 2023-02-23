<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">

        <system-message id="error-message" class="is-danger" v-if="hasError">
          <template #header-slot>
            <p>Incorrect input</p>
          </template>
          <template #button-slot><button class="delete" aria-label="delete" @click="hasError = false"></button></template>
          <template #body-slot>{{ errorMsg }}</template>
        </system-message>

        <div class="modal-header">
          <div class="tile is-ancestor">
            <div class="tile is-12">
              <h1 class="title is-3">
                <slot name="header">
                  default header
                </slot>
              </h1>

            </div>
            <div class="tile" id="closeButton" @click="$emit('close')">
              <i class="fa-solid fa-x"></i>
            </div>
          </div>
        </div>

        <div class="modal-body">


          <label for="fTitle">Title:</label>
          <input v-model.trim.lazy="title" class="input is-normal" id="fTitle" type="text" minlength="1"
            placeholder="Enter your title..." required>

          <slot name="author-slot">
          </slot>


          <label for="fContent">Article Content:</label>
          <textarea v-model.trim.lazy="content" id="fContent" class="textarea" placeholder="Enter your content..."
            rows="5" minlength="1" required></textarea>

          <button class="modal-default-button button is-primary" @click="takeAction">Submit</button>


        </div>
      </div>
    </div>
  </div>
</template>

<script>


import { bus } from "../../main";
import systemMessage from "./systemMessage.vue";

export default {

  name: 'modalWindow',
  components: {
    'system-message': systemMessage,
  },
  props: ['posts', 'editablePost', 'isModalEdit'],

  updated() {
    bus.$on('AuthorSelected', (data) => {
      this.author = data;
    })
  },

  data() {
    return {

      title: "",
      author: "",
      content: "",
      hasError: false,
      errorMsg: "",
    }
  },

  computed: {



  },

  created() {
    if (this.isModalEdit) {
      this.title = this.editablePost.title;
      this.content = this.editablePost.body;
    }
    else {
      this.title = "";
      this.content = "";
    }
  },

  watch: {
    title: function (value) {
      console.log("Watcher activated");
      if (!this.title) {
        this.hasError = true;
        this.errorMsg = "The title field is empty!";
      }
      else {
        this.hasError = false;
      }

    },

    author: function (value) {
      if (!this.author) {
        this.hasError = true;
        this.errorMsg = "Author not selected!";
      }
      else {
        this.hasError = false;
      }
    },

    content: function (value) {
      if (!this.content) {
        this.hasError = true;
        this.errorMsg = "Content field is empty!";
      }
      else {
        this.hasError = false;
      }
    },


  },

  methods: {

    takeAction: function () {
      if (this.isModalEdit) {
        //Send a put request for editablePost
        this.putRequest(this.editablePost.id);
        if (this.$router.currentRoute.path != '/') {
          console.log("update event emiited from detail modal");
          bus.$emit('UpdateArticles');
          this.$router.push({ path: '/' });
        }
        else {
          console.log("update event emited from root modal");
          bus.$emit('UpdateArticles');
          this.$emit("CloseModalWindow");
        }
      }
      else {
        this.validatePost();
        //TODO: update after creation
      }
    },

    validatePost: async function () {
      if (!this.title || !this.author || !this.content) {
        this.hasError = true;
        this.errorMsg = "There are empty fields!";
      }
      if (!this.hasError) {
        let date = new Date().toString();
        //Sending a post request:
        this.$http.post('http://localhost:3000/Articles', {
          title: this.title,
          body: this.content,
          author: this.author.id,
          created_at: date,
          updated_at: date
        })
          .catch(error => {
            console.log(error)
          });

      }
    },

    putRequest: async function (postID) {
      if (!this.hasError) {
        let date = new Date().toString();
        this.$http.put(`http://localhost:3000/Articles/${postID}`, {
          title: this.title,
          body: this.content,
          author: this.editablePost.author,
          created_at: this.editablePost.created_at,
          updated_at: this.editablePost.updated_at,
        })
          .catch(error => { console.log(error) });
      }
    }


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