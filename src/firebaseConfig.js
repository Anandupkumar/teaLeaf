import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'

const firebaseConfig = {
    // apiKey: "AIzaSyCfvCTqInEbYBGL9n8B6OlUd37o_ga43K4",
    // authDomain: "https://crickclub-265cd-default-rtdb.firebaseio.com",
    // projectId: "crickclub-265cd",
    // storageBucket: "crickclub-265cd.appspot.com",
    // messagingSenderId: "996731428183",
    // appId: "1:996731428183:ios:3530fee402011cbe41b212",

    apiKey: "AIzaSyBhkU0T92q-6GHqRESk7hoz9meUjFa6I5Q",
    authDomain: "rasbuy-b614b.firebaseapp.com",
    projectId: "rasbuy-b614b",
    storageBucket: "rasbuy-b614b.appspot.com",
    messagingSenderId: "411400415119",
    appId: "1:411400415119:web:f877dcd49ea2f739f9cdfa",
    // measurementId: "G-MF2L0HVM59"
};
  
firebase.initializeApp(firebaseConfig)

export default firebase;