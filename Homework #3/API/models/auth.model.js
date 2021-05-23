const textService = require("../textService");
const { v4: uuidv4 } = require("uuid");


class AuthModel {
  
    registerNewUser(user) {
        return new Promise((resolve, reject) => {

            user.role = "User";
            user.id = uuidv4();
            

            const dbDataText = textService.readDataFromDb('db.json');
            const dbData = (JSON.parse(dbDataText));

            const emailExists = dbData.filter(u => u.email === user.email);

            if(emailExists.length === 0) {
                dbData.push(user);
                const dbDataStringified = JSON.stringify(dbData);
                textService.writeDataToDb('db.json', dbDataStringified);

                resolve({
                    message: "User successfully created!"
                })
            } else {
                console.log("A user with this email address already exists!");
            }
            
        });
    };

    loginWithEmailAndPassword (credentials) {
        return new Promise ((resolve, reject) => {
            
            const dbDataText = textService.readDataFromDb('db.json');
            const dbData = (JSON.parse(dbDataText));

            const filterUser = dbData.filter(user => {

                if (credentials.email === user.email &&
                    credentials.password === user.password) {
                    return true;
                }
                return false;
                
            });

            if(filterUser && filterUser.length > 0) {
                resolve({
                    message: "User logged in!",
                })
                console.log("User logged in!");

            } else {
                reject({
                    message: "Unknown username or password!",
                })
                console.log("Unknown username or password!");
            }

        });
    };

    userAdmin (credentials) {
        return new Promise ((resolve, reject) => {
            
            const dbDataText = textService.readDataFromDb('db.json');
            const dbData = (JSON.parse(dbDataText));

            const filterUser = dbData.filter(user => {

                if (credentials.email === user.email &&
                    credentials.password === user.password && user.role === "Admin") {
                    return true;
                }
                return false;
                
            });


            if(filterUser && filterUser.length > 0) {

                resolve({
                    message: "User has access!",
                })
                console.log("User has access!");
            } else {
    
                reject({
                    message: "Error! You are not allowed!",
                })
                console.log("Error! You are not allowed!");
            }
        });
    };


}

module.exports = AuthModel;