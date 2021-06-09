const router = require('express').Router();

const auth = require('../routes/auth.route');
const posts = require('../routes/posts.route');
const validateSession = require('./sessionValidator.const');

router.use('/auth', auth);
router.use('/posts', validateSession, posts);


module.exports = router;