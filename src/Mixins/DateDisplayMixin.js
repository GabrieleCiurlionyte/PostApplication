export default {
  methods: {
    postTime(post) {
      if (post.updated_at > post.created_at) {
        return post.updated_at.toLocaleString();
      } else {
        return post.created_at.toLocaleString();
      }
    }
  }
};
