<template>
  <div id="page">

    <body>
      <div class="mainbox">
        <div class="err">4</div>
        <i class="far fa-question-circle fa-spin"></i>
        <div class="err2">4</div>
        <div class="msg">Page not found
        </div>
      </div>
    </body>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: ['post'],
  data() {
    return {
    }
  },
  created() {
  },
  computed: {
  },
  methods: {
  },
}
</script>

<style scoped>
.mainbox {
  margin: auto;
  height: 600px;
  width: 600px;
  position: relative;
}

  .err {
    color: black;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 11rem;
    position:absolute;
    left: 20%;
    top: 8%;
  }

.far {
  position: absolute;
  font-size: 8.5rem;
  left: 42%;
  top: 15%;
  color: black;
}

 .err2 {
    color: black;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 11rem;
    position:absolute;
    left: 68%;
    top: 8%;
  }

.msg {
    text-align: center;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 1.6rem;
    position:absolute;
    left: 16%;
    top: 45%;
    width: 75%;
  }

a {
  text-decoration: none;
  color: white;
}

a:hover {
  text-decoration: underline;
}

</style>