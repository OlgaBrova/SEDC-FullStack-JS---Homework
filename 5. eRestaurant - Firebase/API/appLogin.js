// window.addEventListener("DOMContentLoaded", () => {

//     const firebaseConfig = {
//         apiKey: "AIzaSyBcaqNhz-6qZOc1hmHCjg3JrShlG4jGxp8",
//         authDomain: "awesome-blog-c936d.firebaseapp.com",
//         projectId: "awesome-blog-c936d",
//         storageBucket: "awesome-blog-c936d.appspot.com",
//         messagingSenderId: "80608292046",
//         appId: "1:80608292046:web:810057994a4cfb5a9eb49f",
//         measurementId: "G-K8CBQVH84B"
//     }; 

//     firebase.initializeApp(firebaseConfig);
//     firebase.auth().setPersistence(firebase.auth.Auth.Persistence.None);

// });


const API_URL = "http://localhost:3000";

const openRegisterFormBtn = document.getElementById("registerBtn");
const openLoginFormBtn = document.getElementById("loginBtn");
const loginFormDiv = document.getElementById("loginFormDiv");
const registerFormDiv = document.getElementById("registerFormDiv");

const submitBtnRegister = document.getElementById("submitBtnRegister");

const newUserEmail = document.getElementById("newUserEmail");
const newUserPassword = document.getElementById("newUserPassword");
const newUserFullName = document.getElementById("newUserFullName");

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
    const username = newUserFullName.value;
  

    const user = {
        email,
        password,
        username
    };

    postNewUser(user);

    newUserEmail.value = '';
    newUserPassword.value = '';
    newUserFullName.value = '';
  
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

        window.location.href = "streetFood.html";
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


//LOGOUT route and current user needs to be added

