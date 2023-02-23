<template>
    <div class="dropdown"
        :class="{ 'is-active': isActive }">
        <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu"
                @click="isActive = !isActive">  

                <span>{{ ButtonName }}</span>

                <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
                
                <a class="dropdown-item" v-for="author in authors" :key="author.id"
                    @click="SelectAuthor(author)"
                    :class="CheckCurrent">
                    {{ author.name }}
                </a>
                
            </div>
        </div>
        
    </div>
</template>

<script>
import {bus} from "../main"
export default {
    components: {
    },
    props: [
        'authors',
    ],
    data() {
        return {
            ButtonName : "Select author",
            isActive : false, 
            selectedAuthor : null,
            isSelected : false,
        }
    },
    mounted() {
    },
    created() {
    },
    computed: {
        
         
    },
    methods: {
        SelectAuthor : function(author){
            this.selectedAuthor = author;
            this.ButtonName = author.name;
            this.isSelected = true;
            this.isActive = false;
            bus.$emit('AuthorSelected', author);
        },

        CheckCurrent : function(authorID) {
            if(authorID == this.selectedID) {
                return { 'is-active' : isSelected}
            }
        }
    },
    watch: {
    }
}
</script>

<style scoped>
    .dropdown {
        display: block;
    }
</style>