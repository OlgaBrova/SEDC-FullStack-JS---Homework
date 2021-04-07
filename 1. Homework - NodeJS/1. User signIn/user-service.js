const fs = require ('fs');

const getUsers = () => {
    let data = fs.readFileSync('./users.json');
    let parsedData = JSON.parse(data);
    return parsedData;
}
// let result = getUsers();
// console.log(result);


const userLogIn = (usernameInput, passwordInput) => {
    let users = getUsers();
    const exists = users.find(u => u.username === usernameInput);
    
    if(!exists) {
        throw new Error(`A user with the username ${usernameInput} does not exist!`);
    }
    const password = exists.password === passwordInput;

    if (exists && !password) {
        throw new Error(`Wrong password!`);
    } else if(exists && password) {
        console.log(`User logged in!`);
    }

}

const addUser = (usernameInput, passwordInput) => {
    let users = getUsers();
    const exists = users.find(u => u.username === usernameInput);
    if (exists) {
        throw new Error (`The user with username: ${usernameInput} already exists.`);
    }

    let newUser = {
        username: usernameInput,
        password: passwordInput
    }
    
    users = [...users, newUser];
    saveUsers(users);
    console.log(`New user registered!`);
}


const saveUsers = (users) => {
    let data = users;
    let stringifiedData = JSON.stringify(data);
    fs.writeFileSync('./users.json', stringifiedData);
}


module.exports = {
    getUsers,
    userLogIn,
    addUser
}

