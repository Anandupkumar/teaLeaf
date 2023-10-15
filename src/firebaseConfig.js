import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCfvCTqInEbYBGL9n8B6OlUd37o_ga43K4",
    authDomain: "https://crickclub-265cd-default-rtdb.firebaseio.com",
    projectId: "crickclub-265cd",
    storageBucket: "crickclub-265cd.appspot.com",
    messagingSenderId: "996731428183",
    appId: "1:996731428183:ios:3530fee402011cbe41b212",
};
  
firebase.initializeApp(firebaseConfig)

export default firebase;