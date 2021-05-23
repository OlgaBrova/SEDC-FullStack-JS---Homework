const router = require('express').Router();
const { v4: uuidv4 } = require("uuid");
const AuthController = require('../controllers/auth.constroller');
const authController = new AuthController();
const sessionValidator = require('../sessionValidator.const');

router.post('/register', (req, res) => {

   const user = req.body;

    authController.postNewUser(user)
        .then((response) => {
        res.status(200).json(response);
    })
})


router.post('/login', (req, res) => {

    const credentials = req.body;
    
    if(credentials && credentials.email && credentials.password) {

        authController.loginUser(credentials)
            .then((response) => {
                
                req.session.authenticated = true;
                res.status(200).json(response);
            })
            .catch((error) => {
                res.status(401).json(error);
            });
    }
    
})




module.exports = router;