const AuthModel = require('../models/auth.model');
const authModel = new AuthModel();

class AuthController {

    postNewUser(user) {
        return authModel.registerNewUser(user);
    }

    loginUser(credentials) {
        return authModel.loginWithEmailAndPassword(credentials);
    }

    userAdmin (credentials) {
        return authModel.userAdmin(credentials);
    }
}

module.exports = AuthController;