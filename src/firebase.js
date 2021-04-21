// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyAokFQ0fhbFoBvetQlTtvWHtrtz5xSAVHE",
        authDomain: "instagram-clone-react-e27d9.firebaseapp.com",
        databaseURL: "https://instagram-clone-react-e27d9-default-rtdb.firebaseio.com",
        projectId: "instagram-clone-react-e27d9",
        storageBucket: "instagram-clone-react-e27d9.appspot.com",
        messagingSenderId: "678398977339",
        appId: "1:678398977339:web:16aef17c27ca408c97031e",
        measurementId: "G-41DK1JX6NV"
});

const db =  firebaseApp.firestore();
const auth = firebase.auth();
const storage =  firebase.storage();
      
export {db, auth, storage};