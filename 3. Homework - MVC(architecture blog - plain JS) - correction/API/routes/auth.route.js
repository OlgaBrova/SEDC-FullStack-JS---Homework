const router = require('express').Router();
const { v4: uuidv4 } = require("uuid");
const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();


router.post('/register', (req, res, next) => {

   const user = req.body;

    authController.postNewUser(user)
        .then((response) => {
        res.status(200).json(response);
    })
    .catch((error) => {
        res.status(401).json(error);
    });
})


router.post('/login', (req, res, next) => {

    const credentials = req.body;
    
    if(credentials && credentials.email && credentials.password) {

        authController.loginUser(credentials)
            .then((response) => {
                let user = response;
                
                console.log(`this is the user`, user);
                console.log(`this is the user type:`, user[0].type);

                const session_id = uuidv4();
                process.env.session_id = session_id;

                res.cookie('user_type', user[0].type);
                res.cookie('session_id', session_id);
                res.status(200).json(response);
            })
            .catch((error) => {
                res.status(500).json({ message: error.message });
            });
    }
    
})

router.post('/logout', (req, res, next) => {

    process.env.session_id = null;
    res.status(200).json({ message: 'Logged out!' })

})


module.exports = router;