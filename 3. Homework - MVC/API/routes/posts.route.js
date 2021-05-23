const router = require('express').Router();
const PostsController = require('../controllers/posts.controller');
const validateSession = require('../sessionValidator.const');
const roleAuthentication = require('../roleAuthentication');
const postsController = new PostsController();

router.get('/all-posts',
    // validateSession,  
    (req, res) => {

    postsController.getAllPosts()
        .then((response) => {
         res.status(200).json(response);
    })
    .catch((error) => {
        res.status(400).json(error);
    });
});

router.post('/new-post', 
    //validateSession,
     (req, res) => {

    const post = req.body;

    postsController.postNewPost(post)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

router.delete('/:id?', 
        //validateSession,
        //roleAuthentication, 
        (req, res) => {

    const id = req.params.id;

    if(id) {
        postsController.deletePost(id)
            .then((response) => {
                res.status(200).json(response);
            })
            
    }
});

router.put('/:id?', 
        //validateSession,
        //roleAuthentication, 
        (req, res) => {

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