<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-content">
          
            <!--CONTENT-->
            <div class="card">
                <div class="card-content">
                  <div class="content">
                    <slot name="text-slot"></slot>
                  </div>
                </div>
                <footer class="card-footer">
                  <a href="#" class="card-footer-item"
                  @click="CancelConfirmation">No</a>
                  <a href="#" class="card-footer-item"
                  @click="ConfirmConfirmation">Yes</a>
                </footer>
              </div>

        </div>
        <button class="modal-close is-large" aria-label="close"></button>
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
        CancelConfirmation : function(){
            this.$emit('CancelConfirmation');
        },
        ConfirmConfirmation: function(){
            this.$emit('ConfirmConfirmation');
        },
    },
    watch: {
    }
  }
  </script>
  
  <style scoped>
  
  </style>