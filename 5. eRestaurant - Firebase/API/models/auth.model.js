class AuthModel {
    constructor() {}

    register(registerCredentials) {
        const { email, password, username } = registerCredentials;
      
        return new Promise((resolve, reject) => {
            process.firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(async (result) => {
                    console.log('Result', result);

                    await
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
                       
                        resolve(result);
                        
                    })
                    .catch((error) => {
                        reject(error);
                    });
                })
                .catch((error) => {
                    
                    reject(error);
                    console.log("A user with this email address already exists!");
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
                    console.log("User logged in!");
                })
                .catch((error) => {
                    reject(error);
                    console.log("Unknown username or password!");
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
                    console.log("User logged out!");
                })
                .catch((error) => {
                     reject(error);
                });
        })
    }
  
}

module.exports = AuthModel;