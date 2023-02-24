<template>
  <div>
    <system-message>
      <template #button-slot><button class="delete" aria-label="delete" @click="changeSystemMessageShow(false)"></button></template>
    </system-message>
    <router-view></router-view>
  </div>
  
</template>

<script>


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
  methods: {
    changeSystemMessageShow(value) {
      this.$store.commit('changeSystemMessageShow', value);
    }
  }
  
}
</script>

<style>
  @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>
