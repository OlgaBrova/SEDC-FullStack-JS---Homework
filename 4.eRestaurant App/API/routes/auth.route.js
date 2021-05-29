const router = require('express').Router();
const AuthController = require('../controllers/auth.constroller');
const authController = new AuthController();


router.post('/register', (req, res) => {

   console.log(req.body);
   const credentials = req.body;
   authController.registerUser(credentials)
    .then((payload) => {
        req.session.user = payload;
        res.status(200).json(payload);
    })
    .catch((error) => {
        res.status(400).json(error);
      });
});


router.post('/login', (req, res) => {

    const credentials = req.body;
    authController.loginUser(credentials)
        .then((data) => {
            req.session.user = data;
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
        
});


router.post('/logout', (req, res) => {
    authController.logoutUser()
        .then((data) => {
            req.session.user = undefined;
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(400).json(error);
          });
});


router.get('/current-user', (req, res) => {
    const currentUser = process.firebase.auth().currentUser;
    if(currentUser) {
        res.status(200).json(currentUser);
    } else {
        res.status(400).json({
            message: 'No user is logged in!',
        })
    }
})


module.exports = router;