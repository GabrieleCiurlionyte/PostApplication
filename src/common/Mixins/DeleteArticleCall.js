export const DeleteArticleCall = {

    methods : {
        deleteArticle: async function (postID) {
            try {
              const response = await this.$http.delete(
                `http://localhost:3000/Articles/${postID}`
              );
              this.$emit('successful', 'The delete was successful!');
            } catch (error) {
              console.log(error);
              this.$emit('unsuccessful', 'Unsuccessful delete. Please try again.');
            }
      
          },
    }
    
}