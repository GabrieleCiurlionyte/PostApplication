<template>
  <div>
    <system-message v-if="showSystemMessage"></system-message>
    <router-view></router-view>
  </div>
  
</template>

<script>

import { mapMutations, mapState } from 'vuex';
import systemMessage from './components/Messages/systemMessage.vue';

export default {
  name: 'app',
  components:{
    'system-message': systemMessage,
  },
  data () {
    return {
      
    }
  },
  computed: mapState([
    'showSystemMessage',
    'isSystemMessageSuccessful',
    'systemMessageMode',
  ]),
  methods: mapMutations([
    'changeSystemMessageShow',
    'changeSystemMessageSuccessState',
    'changeSystemMessageMode',
  ]),
}
</script>

<style>
  @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>
