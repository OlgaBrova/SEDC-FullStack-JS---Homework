const textService = require("../textService");
const { v4: uuidv4 } = require("uuid");

class PostsModel {

    getPosts() {
        return new Promise((resolve, reject) => {
            const dbPostsText = textService.readDataFromDb("blogs.json");
            const dbPosts = JSON.parse(dbPostsText);

            resolve(dbPosts);
        })
    }

    addNewPost(post) {
        return new Promise((resolve, reject) => {

            post.id = uuidv4();

            const dbDataText = textService.readDataFromDb('blogs.json');
            const dbData = JSON.parse(dbDataText);

            dbData.push(post);
            const dbDataStringified = JSON.stringify(dbData);
            textService.writeDataToDb('blogs.json', dbDataStringified);

            resolve({
                message: "Post successfully created!"
            })
        })
    }

    deletePost(postId) {
        return new Promise((resolve, reject) => {

            const dbDataText = textService.readDataFromDb('blogs.json');
            let dbData = JSON.parse(dbDataText);

            let filtered = dbData.filter((post) => post.id !== postId);
            dbData = filtered;

            const dbDataStringified = JSON.stringify(dbData);
            textService.writeDataToDb('blogs.json', dbDataStringified);

            resolve({
                message: 'Post successfully deleted!',
              })

        })
    }

    editPost(id, body) {
        return new Promise((resolve, reject) => {

            const dbDataText = textService.readDataFromDb('blogs.json');
            let dbData = JSON.parse(dbDataText);

            dbData.forEach(post => {

                if(post.id === id) {
                    post.architect = body.architect;
                    post.location = body.location;
                    post.imageUrl = body.imageUrl;
                    post.description = body.description;
                }
            });

            const dbDataStringified = JSON.stringify(dbData);
            textService.writeDataToDb('blogs.json', dbDataStringified);

            resolve({
                message: "Post successfully updated!"
            })
        })
    }

}

module.exports = PostsModel;