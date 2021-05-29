class AuthModel {
    constructor() {}

    register(registerCredentials) {
        const { email, password, username } = registerCredentials;
        console.log(registerCredentials, 'Credentials seccesss');
        return new Promise((resolve, reject) => {
            process.firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((result) => {
                    process.firebase
                    .firestore()
                    .collection("users")
                    .doc(email)
                    .set({
                        email: email,
                        password: password,
                        username: username,
                        roles: ["user"],
                    })
                    .then((result) => {
                        console.log(result);
                        resolve(result);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    login(loginCredentials) {
        const { email, password } = loginCredentials;
        return new Promise((resolve, reject) => {
            process.firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }

    logout() {
        return new Promise((resolve, reject) => {
            process.firebase
                .auth()
                .signOut()
                .then(() => {
                    resolve({});
                })
                .catch((error) => {
                     reject(error);
                });
        })
    }
  
}

module.exports = AuthModel;