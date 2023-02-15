<template>
    
    <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <div class="tile is-ancestor">
                <div class="tile is-12">
                  <slot name="header">
                  default header
                  </slot>
                </div>
                <div class="tile" id="closeButton" @click="$emit('close')">
                  <i class="fa-solid fa-x"></i>
                </div>
              </div>             
              </div>
             
              <div class="modal-body"> 
                <form>
                   <!--TODO: Form for title-->
                <label for="fTitle">Title:</label>
                <input class="input is-normal" id="fTitle" type="text" minlength="1" placeholder="Enter article title" required>
                
                <slot name="author-slot">
                </slot>

              <!--TODO: Form for content-->
              <label for="fContent">Article Content:</label>
              <textarea id="fContent" class="textarea" placeholder="Enter article text" rows="5" minlength="1" required></textarea>

              <button class="modal-default-button button is-primary" @click="$emit('close')">Submit</button>

                </form>              
              </div>
              </div>      
            </div>
          </div>
    
  </template>
  
  <script>

  export default {
    
    name: 'modalWindow',
    components: {

    },
    data () {
      return {
        
      }
    },

    computed(){
    }

  }
  </script>
  
  <style scoped>

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