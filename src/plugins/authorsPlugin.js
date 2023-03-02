import "babel-polyfill";
import Vue from 'vue';

export const authorsPlugin = {
  authors: []
};

authorsPlugin.getAuthors = async function() {
  if (this.authors.length == 0) {
    try {
      this.authors = await Vue.prototype.$requestPlugin.getAuthors();
      console.log(this.authors);
      return this.authors;
    } catch (error) {
      console.log(error);
    }
  } else {
    return this.authors;
  }
};

authorsPlugin.getAuthorName = function(post) {
  console.log("Calculate author name");
  if(this.authors.length == 0) {
    this.authors = this.getAuthors();
  }
  let authorID = post.author;
  if(this.authors.filter(author => author.id == authorID)[0].name != null) {
    console.log("Author name found");
    return this.authors.filter(author => author.id == authorID)[0].name;
  }
  else {
    //TODO: custom exception
    throw error; 
  }
  
};

export default {
  install(Vue) {
    Vue.prototype.$authorsPlugin = authorsPlugin;
  }
};
