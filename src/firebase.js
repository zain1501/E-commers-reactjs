import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB0GJLW_x-Y4zlwFlXU9RRnQkCW-oJA2_0",
    authDomain: "clone-711d5.firebaseapp.com",
    projectId: "clone-711d5",
    storageBucket: "clone-711d5.appspot.com",
    messagingSenderId: "1087173103289",
    appId: "1:1087173103289:web:6a0412a50517bb31869568",
    measurementId: "G-HVYFQ5VGXV"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db,auth};