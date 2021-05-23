const API_URL = "http://localhost:3000";

const openRegisterFormBtn = document.getElementById("registerBtn");
const openLoginFormBtn = document.getElementById("loginBtn");
const loginFormDiv = document.getElementById("loginFormDiv");
const registerFormDiv = document.getElementById("registerFormDiv");

const submitBtnRegister = document.getElementById("submitBtnRegister");

const newUserEmail = document.getElementById("newUserEmail");
const newUserPassword = document.getElementById("newUserPassword");
const newUserFullName = document.getElementById("newUserFullName");
const newUserAge = document.getElementById("newUserAge");
const newUserGender = document.getElementById("newUserGender");

const submitBtnLogIn = document.getElementById("submitBtnLogIn");

const loginEmail = document.getElementById("inputEmail");
const loginPassword = document.getElementById("inputPassword");

openRegisterFormBtn.addEventListener('click', () => {
  
    loginFormDiv.style.display = "none";
    registerFormDiv.style.display = "block"; 
});

openLoginFormBtn.addEventListener('click', () => {
  
    registerFormDiv.style.display = "none"; 
    loginFormDiv.style.display = "block"; 
});


const postNewUser = (user) => {
    fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    })
   
};

submitBtnRegister.addEventListener("click", (e) => {
    e.preventDefault();

    const email = newUserEmail.value;
    const password = newUserPassword.value;
    const fullName = newUserFullName.value;
    const age = newUserAge.value;
    const gender = newUserGender.value;

    const user = {
        email,
        password,
        fullName,
        age,
        gender
    };

    postNewUser(user);

    newUserEmail.value = '';
    newUserPassword.value = '';
    newUserFullName.value = '';
    newUserAge.value = '';
    newUserGender.value = '';

    
    loginFormDiv.style.display = "block";
    registerFormDiv.style.display = "none"; 

});


const userLogIn = (user) => {
    fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
    .then((response) => response.json())
    .then((result) => {

        window.location.href = "blogPosts.html";
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    })
};


submitBtnLogIn.addEventListener("click", (e) => {
    e.preventDefault();

    const email = loginEmail.value;
    const password = loginPassword.value;

    const credentials = {
        email,
        password
    };

    userLogIn(credentials);

    loginEmail.value = '';
    loginPassword.value = '';

});

