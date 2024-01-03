import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBL_FMFTTqSQMxOsSJElPaVKgib_MOpbQ8",
  authDomain: "whatsapp-clone-99414.firebaseapp.com",
  projectId: "whatsapp-clone-99414",
  storageBucket: "whatsapp-clone-99414.appspot.com",
  messagingSenderId: "566455992527",
  appId: "1:566455992527:web:a624d1434d7bec7013f7ba",
  measurementId: "G-NTX8N295MG",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
