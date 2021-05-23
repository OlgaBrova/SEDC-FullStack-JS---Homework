const PostsModel = require('../models/posts.model');
const postsModel = new PostsModel();

class PostsController {

    getAllPosts() {

        return postsModel.getPosts();
    }

    postNewPost(post) {
        return postsModel.addNewPost(post);
    }

    deletePost(postId) {
        return postsModel.deletePost(postId);
    }

    updatePost(id, body) {
        return postsModel.editPost(id, body);
    }

}

module.exports = PostsController;