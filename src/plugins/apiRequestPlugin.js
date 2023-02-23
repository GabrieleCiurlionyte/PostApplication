import "babel-polyfill";
import axios from "axios";

export const requestPlugin = {};

requestPlugin.http = axios.create({ baseURL: "http://localhost:3000" });
const POSTS_PER_PAGE = 4;

requestPlugin.getPostData = async function(postID) {
  const response = await this.http.get(`/Articles/${postID}`);
  return response.data;
};

requestPlugin.getPageCount = async function() {
  const response = await this.http.get(`/Articles`);
  var postsCount = response.data.length;
  var quotient = Math.floor(postsCount / POSTS_PER_PAGE);
  var remainder = postsCount % POSTS_PER_PAGE;
  return remainder == 0 ? quotient : quotient + 1;
};

requestPlugin.getAuthors = async function() {
  const response = await this.http.get(`/Authors`);
  return response.data;
};

requestPlugin.getPageData = async function(pageNumber) {
  const response = await this.http.get(
    `/Articles?_page=${pageNumber}&_limit=${POSTS_PER_PAGE}`
  );
  return response.data;
};

requestPlugin.deletePost = async function(postID) {
  const response = await this.http.delete(`/Articles/${postID}`);
  return response.data;
};

requestPlugin.searchQuery = async function(searchQuery, pageNumber) {
    const response = await this.http.get(
        `http://localhost:3000/Articles?q=${searchQuery}&_page=${pageNumber}&_limit=${POSTS_PER_PAGE}`
      );
    return response.data;
}

export default {
  install(Vue) {
    Vue.prototype.$requestPlugin = requestPlugin;
  }
};
