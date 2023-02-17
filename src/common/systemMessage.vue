
  <template>
    <article class="message validation-msg">
        <div class="message-header">
          <slot name="header-slot"></slot>
          <slot name="button-slot"></slot>
        </div>
        <div class="message-body">
            <slot class="message-body" name="body-slot"></slot> 
          </div>
      </article>
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
  .validation-msg {
    position: absolute;
    z-index: 999999;
    width: 60%;
    margin-left: 20vw;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  </style>