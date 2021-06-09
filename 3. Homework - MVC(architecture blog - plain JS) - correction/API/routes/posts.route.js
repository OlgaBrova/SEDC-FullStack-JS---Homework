const router = require('express').Router();
const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();
const adminGuard = require('../guards/admin.guards');

router.get('/all-posts', (req, res, next) => {

    postsController.getAllPosts()
        .then((response) => {
         res.status(200).json(response);
    })
    .catch((error) => {
        res.status(400).json(error);
    });
});

router.post('/new-post', (req, res, next) => {

    const post = req.body;

    postsController.postNewPost(post)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

router.delete('/:id?', adminGuard, (req, res, next) => {

    const id = req.params.id;

    if(id) {
        postsController.deletePost(id)
            .then((response) => {
                res.status(200).json(response);
            })
            
    }
});

router.put('/:id?', adminGuard, (req, res, next) => {

    const id = req.params.id;
    const body = req.body;

    if(id && body) {
        postsController.updatePost(id, body)
            .then((response) => {
                res.status(200).json(response);
            })
            
    }
});


module.exports = router;