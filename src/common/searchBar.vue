<template>
  <div class="field">
    <p class="control has-icons-left">
      <slot name="input-slot"></slot>
      <span class="icon is-small is-left">
        <slot name="icon-slot"></slot>
      </span>
    </p>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: [
  ],
  data() {
    return {
    }
  },
  mounted() {
  },
  created() {
  },
  computed: {
  },
  methods: {
  },
  watch: {
  }
}
</script>

<style scoped>
.input {
  width: 40%;
}

.field {
  display: inline;
  margin: 0
}

.control {
  display: inline;
  margin-left: 0.7rem;
  width: 90%;
  height: 70%;
}
</style>