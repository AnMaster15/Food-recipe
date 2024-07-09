// Import the functions you need from the SDKs you need
// config
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// import 'firebase/auth'
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAvtHsL7XYkEANilq1aQydKL3wAK6Ec4OM",
  authDomain: "foodapp-2dc59.firebaseapp.com",
  projectId: "foodapp-2dc59",
  storageBucket: "foodapp-2dc59.appspot.com",
  messagingSenderId: "227110810691",
  appId: "1:227110810691:web:9045f8e0f24eca9ec1d0f6",
  measurementId: "G-5PP2E3P8C6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth };

// export {app}

