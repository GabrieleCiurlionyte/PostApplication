import "babel-polyfill";
import Vue from 'vue';

export const authorsPlugin = {
  authors: []
};

authorsPlugin.getAuthors = async function() {
  if (authorsPlugin.authors.length == 0) {
    try {
      authorsPlugin.authors = await Vue.prototype.$requestPlugin.getAuthors();
      return authorsPlugin.authors;
    } catch (error) {
      console.log(error);
    }
  } else {
    return authorsPlugin.authors;
  }
};

authorsPlugin.getAuthorName = async function(post) {
  console.log("Calculate author name");
  if(authorsPlugin.authors.length == 0) {
    authorsPlugin.authors = await authorsPlugin.getAuthors();
  }
  let authorID = post.author;
  if(authorsPlugin.authors.filter(author => author.id == authorID)[0].name != null) {
    console.log("Author name found");
    return authorsPlugin.authors.filter(author => author.id == authorID)[0].name;
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
