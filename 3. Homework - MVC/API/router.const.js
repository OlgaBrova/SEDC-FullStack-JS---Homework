const router = require('express').Router();

const auth = require('./routes/auth.route');
const posts = require('./routes/posts.route');

router.use('/auth', auth);
router.use('/posts', posts);


module.exports = router;