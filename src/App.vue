<template>
  <div>
    <system-message v-if="systemMessageStore.showSystemMessage">
          <template #button-slot><button class="delete" aria-label="delete"
          @click="changeSystemMessageShow"></button></template>
    </system-message>

    <modal-window v-if="modalWindowStore.showModal"
      @CloseModalWindow="changeModalWindowShow">

    </modal-window>
   
    <router-view></router-view>
  </div>
</template>
<script>
          

import systemMessage from './components/Messages/systemMessage.vue';
import modalWindow from './components/Messages/modalWindow.vue';
import { mapState } from "vuex";
import { modalWindowStore } from './store/modules/modalWindowStore';



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
    changeSystemMessageShow() {
      this.$store.commit("systemMessageStore/changeSystemMessageShow",false);
    },
    changeModalWindowShow(){
      this.$store.commit("modalWindowStore/changeShowModal",false);
    },
  },
  computed: {
    ...mapState(["modalWindowStore", "systemMessageStore"]),
  },

}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>
