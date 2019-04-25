// Initialize Firebase
import firebase from 'firebase'
import firestore from 'firebase/firestore'

var config = {
    apiKey: "AIzaSyDZ6yrkSdvWDdEls-asNwgew20vdmpA7a0",
    authDomain: "workout-tracker-35b1a.firebaseapp.com",
    databaseURL: "https://workout-tracker-35b1a.firebaseio.com",
    projectId: "workout-tracker-35b1a",
    storageBucket: "workout-tracker-35b1a.appspot.com",
    messagingSenderId: "846025205582"
};
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore()
