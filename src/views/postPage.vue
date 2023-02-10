<template>
    <div id="Page">
        <pagination-page></pagination-page>
        <pagination-element></pagination-element>
    </div>
</template>

<script>

import paginationPage from "../modules/PostPage/paginationPage.vue";
import paginationElement from "../modules/PostPage/paginationElement.vue";

export default {

  components: {
    'pagination-page': paginationPage,
    'pagination-element' : paginationElement,
  },

  props: [
  ],
  
  data () {
    return {
    }
  },

  mounted () {
  },

  created () {
  },

  computed: {
  },
  methods: {
  },

}
</script>

<style scoped>
</style>