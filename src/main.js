import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/router";

// import * as firebase from "firebase/app";
// import "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyD-8hZniJnEO3h_QQ",
//   authDomain: "my-app.firebaseapp.com",
//   projectId: "my-app",
//   storageBucket: "my-app.appspot.com",
//   messagingSenderId: "1234567890",
//   appId: "1:1234567890:web:0987654321",
// };

// firebase.initializeApp(firebaseConfig);

createApp(App).use(router).mount("#app");
