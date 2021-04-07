const userService = require ('./user-service');

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question('Would you like to log in or register?', answer => {

    if (answer === "log in") {
        rl.question('Please enter your username >', username => {

            rl.question('Please enter your password>', password => {
                userService.userLogIn(username, password);
                rl.close();
            })
        })
    } else if (answer === "register") {
        rl.question('Choose a username >', username => {

            rl.question('Choose a password>', password => {
                userService.addUser(username, password);
                rl.close();
            })
        })
    }

})


