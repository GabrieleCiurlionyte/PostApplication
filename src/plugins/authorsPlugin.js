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


export default {
  install(Vue) {
    Vue.prototype.$authorsPlugin = authorsPlugin;
  }
};
