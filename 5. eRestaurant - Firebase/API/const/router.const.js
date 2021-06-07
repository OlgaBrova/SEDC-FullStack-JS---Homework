const router = require('express').Router();

const auth = require('../routes/auth.routes');
const dishes = require('../routes/dishes.routes');

router.use('/auth', auth);
router.use('/dishes', dishes);


module.exports = router;