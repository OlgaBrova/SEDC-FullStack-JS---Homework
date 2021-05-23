const AuthController = require('./controllers/auth.constroller');
const authController = new AuthController();

const authRole = (req, res, next) => {

    const credentials = req.body;

    if(credentials && credentials.email && credentials.password) {

        authController.userAdmin(credentials)
            .then((response) => {

                res.status(200).json(response);
            })
            .catch((error) => {
                res.status(401).json({
                    message: 'Error! You are not allowed!'
                });
                console.log('Error! You are not allowed!');
            });
    }

// star kod/////////////////////////
    // if (user.role === "Admin") {
    //     next();
    // } else {
    //     res.status(400).json({
    //         message: 'Error! You are not allowed!'
    //     })
    //     console.log('Error! You are not allowed!');

    // }
}


module.exports = authRole;