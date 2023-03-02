<template>
  <div>
    <system-message v-if="this.showSystemMessage">
          <template #button-slot><button class="delete" aria-label="delete"
          @click="changeSystemMessageShow(false)"></button></template>
    </system-message>
    <modal-window v-if="showModal">
      
    </modal-window>  
    <router-view></router-view>
  </div>
</template>
<script>
          

import { mapState } from 'vuex';
import systemMessage from './components/Messages/systemMessage.vue';
import modalWindow from './components/Messages/modalWindow.vue';
import { modalWindowStore } from './stores/modalWindowStore';

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
    changeSystemMessageShow(value) {
      this.$store.commit('changeSystemMessageShow', value);
    },
    changeModalWindowShow(value) {
      modalWindowStore.commit('changeShowModal', value);
    }
  },
  computed: mapState([
    'showSystemMessage',
    'showModal'
])

}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>
