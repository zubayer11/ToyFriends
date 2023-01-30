import firebase from "firebase/compat/app";
import {} from "firebase/compat/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBcpUXMDlbCctg6WkBHf8a4H4UUp4QvB7E",
  authDomain: "toyfriends-3f5b2.firebaseapp.com",
  databaseURL:
    "https://toyfriends-3f5b2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "toyfriends-3f5b2",
  storageBucket: "toyfriends-3f5b2.appspot.com",
  appId: "1:236319858555:web:16122600412d9ed7ae27de",
};
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;