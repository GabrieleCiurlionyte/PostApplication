
<template>
    <article class="message validation-msg is-danger">
      <div class="message-header">
        <p>Incorrect input</p>
        <slot name="button-slot"></slot>
      </div>
      <div class="message-body">
        {{ modalWindowStore.errorMsg }}
      </div>
    </article>
  </template>
  
    
  <script>
  import { mapState } from 'vuex';
import { modalWindowStore } from '../../store/modules/modalWindowStore';
  export default {
    components: {
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState(["modalWindowStore", "systemMessageStore"]),
    },
  }
  
  </script>
    
  <style scoped>
  .button {
    display: inline;
    margin-left: 1rem;
    width: 20%;
    height: 70%;
    margin: auto;
  }
  
  .validation-msg {
    position: absolute;
    z-index: 999999;
    width: 60%;
    margin-left: 20vw;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  </style>