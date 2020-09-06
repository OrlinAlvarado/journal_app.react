import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAi5XmdYxMQkRvNTFJO-h1tfWAAfjq5oes",
    authDomain: "react-app-cursos-d0bc1.firebaseapp.com",
    databaseURL: "https://react-app-cursos-d0bc1.firebaseio.com",
    projectId: "react-app-cursos-d0bc1",
    storageBucket: "react-app-cursos-d0bc1.appspot.com",
    messagingSenderId: "97306439018",
    appId: "1:97306439018:web:bd40042e037ed840550913"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}
