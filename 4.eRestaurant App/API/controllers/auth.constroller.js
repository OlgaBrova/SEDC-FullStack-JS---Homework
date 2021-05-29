const AuthModel = require('../models/auth.model');
const authModel = new AuthModel();

class AuthController {

    registerUser(credentials) {
        return authModel.register(credentials);
    }

    loginUser(credentials) {
        return authModel.login(credentials);
    }

    logoutUser () {
        return authModel.logout();
    }
}

module.exports = AuthController;