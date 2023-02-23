<template>
  <button class="button is-success">
    <span class="icon is-small">
      <slot name="icon-slot"></slot>
    </span>
    <slot name="text-slot"></slot>
  </button>
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
.button {
  display: inline;
  margin-left: 1rem;
  width: 20%;
  height: 70%;
  margin: auto;
}
</style>