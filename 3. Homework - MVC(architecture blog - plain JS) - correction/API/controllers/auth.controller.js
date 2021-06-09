const AuthModel = require('../models/auth.model');
const authModel = new AuthModel();

class AuthController {

    postNewUser(user) {
        return authModel.registerNewUser(user);
    }

    loginUser(credentials) {
        return authModel.loginWithEmailAndPassword(credentials);
    }

}

module.exports = AuthController;