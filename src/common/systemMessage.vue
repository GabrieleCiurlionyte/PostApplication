
  <template>
    <article class="message validation-msg" :class="{'is-danger':!isSuccessful, 'is-success': isSuccessful}">
        <div class="message-header">
          <p>{{ messageHeader }}</p>
          <slot name="button-slot"></slot>
        </div>
        <div class="message-body">
            {{ messageBody }}
          </div>
      </article>
  </template>

  
  <script>
  export default {
    components: {
    },
    props: ['isSuccessful', 'operationName'],
    data() {
      return {
      }
    },
    mounted() {
    },
    created() {
    },
    computed: {
      messageHeader() {
        return (this.isSuccessful ? "Success" : "Error");
      },
      messageBody(){
        return ( this.isSuccessful ? "Sucessful deletion" : "Unsuccessful deletion");
      }
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