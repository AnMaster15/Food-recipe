// Import the functions you need from the SDKs you need
// config
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// import 'firebase/auth'
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "",
  authDomain: "foodapp-2dc59.firebaseapp.com",
  projectId: "foodapp-2dc59",
  storageBucket: "foodapp-2dc59.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth };

// export {app}

