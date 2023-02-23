export const AuthorCallMixin = {

    methods : {
        authorName(post){
            console.log("Calculate author name");
            let authorID = post.author;
            return this.authors.filter((author) => author.id == authorID)[0].name;
          },
    }
    
}