
<template>
  <article class="message validation-msg"
    :class="{ 'is-danger': !systemMessageStore.isSystemMessageSuccessful, 'is-success': systemMessageStore.isSystemMessageSuccessful }">
    <div class="message-header">
      <p>{{ systemMessageStore.isSystemMessageSuccessful ? "Success" : "Error" }}</p>
      <slot name="button-slot"></slot>
    </div>
    <div class="message-body">
      {{ systemMessageStore.systemMessageMode + " " +(systemMessageStore.isSystemMessageSuccessful ? "successful" : "unsuccessful") }}
    </div>
  </article>
</template>

  
<script>
import { mapState } from 'vuex';
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