// firebase.ts

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAvtHsL7XYkEANilq1aQydKL3wAK6Ec4OM",
    authDomain: "foodapp-2dc59.firebaseapp.com",
    projectId: "foodapp-2dc59",
    storageBucket: "foodapp-2dc59.appspot.com",
    messagingSenderId: "227110810691",
    appId: "1:227110810691:web:9045f8e0f24eca9ec1d0f6",
    measurementId: "G-5PP2E3P8C6"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
