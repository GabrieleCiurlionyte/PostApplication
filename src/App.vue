<template>
  <div>
    <system-message v-if="systemMessageStore.showSystemMessage">
          <template #button-slot><button class="delete" aria-label="delete"
          @click=""></button></template>
    </system-message>
   
    <router-view></router-view>
  </div>
</template>
<script>
          

import systemMessage from './components/Messages/systemMessage.vue';
import modalWindow from './components/Messages/modalWindow.vue';
import { mapState } from "vuex";



export default {
  name: 'app',
  components: {
    'system-message': systemMessage,
    'modal-window' : modalWindow,
  },
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {
    ...mapState(["modalWindowStore", "systemMessageStore"]),
  },

}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>
