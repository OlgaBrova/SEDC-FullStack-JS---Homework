const firebase = require('firebase');

const config = {
    apiKey: "AIzaSyBcaqNhz-6qZOc1hmHCjg3JrShlG4jGxp8",
    authDomain: "awesome-blog-c936d.firebaseapp.com",
    projectId: "awesome-blog-c936d",
    storageBucket: "awesome-blog-c936d.appspot.com",
    messagingSenderId: "80608292046",
    appId: "1:80608292046:web:810057994a4cfb5a9eb49f",
    measurementId: "G-K8CBQVH84B"
};

const app = firebase.initializeApp(config);

if (!process.firebase) {
    process.firebase = app;
} else {
    console.log('Firebase connection already established!');
}

module.exports = app;
