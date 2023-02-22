export const APICallsMixin = {
    methods : {
        async getData() {
            try {
                const response = await this.$http.get(
                `http://localhost:3000/Articles/${this.postID}`
                );
                this.post = response.data;
                console.log(this.post);
            } catch (error) {
                console.log(error);
            }
        },

        async getAuthors() {
            try {
              const response = await this.$http.get(
                `http://localhost:3000/Authors/`
              );
              this.authors = response.data;
              console.log(this.authors);
            } catch (error) {
              console.log(error);
            }
          },
    }
}