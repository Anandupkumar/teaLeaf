<template>
  <div id="bg-page">
    <article>
      <div class="container" :class="{ 'sign-up-active': signUp }">
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-left">
              <!-- <h2>Please verify your OTP!</h2> -->
              <p>Please login with your mobile number</p>
              <button class="invert" id="signIn" @click="toggle">Log In</button>
            </div>
            <div class="overlay-right">
              <h2>Hello, Friend!</h2>
              <p>Please enter your personal details</p>
              <!-- <button class="invert" id="signUp" @click="toggle">
                  Create account
                </button> -->
            </div>
          </div>
        </div>
        <form class="sign-up">
          <h2>Verify OTP</h2>
          <div>Enter your OTP to verify</div>
          <input type="text" placeholder="OTP" v-model="otp" />
          <span class="reqSt" v-if="showErrOtp">Enter OTP</span>
          <!-- <input type="number" placeholder="Phone" />
            <input type="password" placeholder="Password" />
            <input type="number" placeholder="Age" /> -->
          <button @click="verifyOTP">Verify</button>
        </form>
        <form class="sign-in" @submit="validateInfo">
          <h2>Log In</h2>
          <div>Use your Mobile number</div>
          <input type="text" placeholder="Mobile" v-model="phone" />
          <span class="reqSt" v-if="showErrMob">Enter mobile number</span>
          <!-- <input type="password" placeholder="Password" /> -->
          <!-- <a href="#">Forgot your password?</a> -->
          <button>Log In</button>
        </form>
      </div>
      <div id="recaptcha-container"></div>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import firebase from "../firebaseConfig";

const phone = ref("");
const appVerifier = ref(null);
const verificationId = ref(null);
const signUp = ref(false);
const otp = ref("");
const showErrMob = ref(false);
const showErrOtp = ref(false)

onMounted(() => {
  appVerifier.value = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
    }
  );
});

const toggle = (e) => {
  e.preventDefault();
  signUp.value = !signUp.value;
};

const validateInfo = (e) => {
  e.preventDefault();
  if (phone.value !== "") {
    signUp.value = !signUp.value;
    // console.log(phone.value);
    sendVerificationCode();
  } else {
    showErrMob.value = true;
  }
};

const sendVerificationCode = () => {
  firebase
    .auth()
    .signInWithPhoneNumber("+91" + phone.value, appVerifier.value)
    .then((confirmationResult) => {
      verificationId.value = confirmationResult.verificationId;
      console.log(verificationId.value);
    })
    .catch((error) => {
      console.error(error);
    });
};

const verifyOTP = (e) => {
  e.preventDefault();
  if (otp.value !== "") {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId.value,
      otp.value
    );

    firebase
      .auth()
      .signInWithCredential(credential)
      .then((userCredential) => {
        // User successfully verified and logged in
        const user = userCredential.user;
        console.log("User verified and logged in:", user.uid);
        // Perform actions after successful verification
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        // Handle verification failure
      });
  } else {
    showErrOtp.value = true;
  }
};
</script>

<style lang="scss">
.reqSt {
  font-size: 12px;
  margin-top: -35px;
  color: red;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

#bg-page {
  font-family: Tahoma;
  font-size: 1rem;
  color: #222;
  background-color: #092525;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  position: relative;
  width: 768px;
  height: 480px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom, #efefef, #ccc);

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.5s ease-in-out;
    z-index: 100;
  }

  .overlay {
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    background: linear-gradient(to bottom right, #7fd625, #009345);
    color: #fff;
    transform: translateX(0);
    transition: transform 0.5s ease-in-out;
  }

  @mixin overlays($property) {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 70px 40px;
    width: calc(50% - 80px);
    height: calc(100% - 140px);
    text-align: center;
    transform: translateX($property);
    transition: transform 0.5s ease-in-out;
  }

  .overlay-left {
    @include overlays(-20%);
  }

  .overlay-right {
    @include overlays(0);
    right: 0;
  }
}

h2 {
  margin: 0;
}

p {
  margin: 20px 0 30px;
}

a {
  color: #222;
  text-decoration: none;
  margin: 15px 0;
  font-size: 1rem;
}

button {
  border-radius: 20px;
  border: 1px solid #009345;
  background-color: #009345;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 40px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.1s ease-in;

  &:active {
    transform: scale(0.9);
  }

  &:focus {
    outline: none;
  }
}

button.invert {
  background-color: transparent;
  border-color: #fff;
}

form {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 90px 60px;
  width: calc(50% - 120px);
  height: calc(100% - 180px);
  text-align: center;
  background: linear-gradient(to bottom, #efefef, #ccc);
  transition: all 0.5s ease-in-out;

  div {
    font-size: 1rem;
  }

  input {
    background-color: #eee;
    border: none;
    padding: 8px 15px;
    margin: 6px 0;
    width: calc(100% - 30px);
    border-radius: 15px;
    border-bottom: 1px solid #ddd;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4), 0 -1px 1px #fff,
      0 1px 0 #fff;
    overflow: hidden;

    &:focus {
      outline: none;
      background-color: #fff;
    }
  }
}

.sign-in {
  left: 0;
  z-index: 2;
}

.sign-up {
  left: 0;
  z-index: 1;
  opacity: 0;
}

.sign-up-active {
  .sign-in {
    transform: translateX(100%);
  }

  .sign-up {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.5s;
  }

  .overlay-container {
    transform: translateX(-100%);
  }

  .overlay {
    transform: translateX(50%);
  }

  .overlay-left {
    transform: translateX(0);
  }

  .overlay-right {
    transform: translateX(20%);
  }
}

@keyframes show {
  0% {
    opacity: 0;
    z-index: 1;
  }
  49% {
    opacity: 0;
    z-index: 1;
  }
  50% {
    opacity: 1;
    z-index: 10;
  }
}

/* Youtube Link */
#yt_link {
  position: absolute;
  right: 0;
  left: 0;
  bottom: -200px;
  display: block;
  width: 160px;
  text-align: center;
  color: red;
  font-size: 15px;
  text-decoration: none;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding: 10px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 2px;
  animation: showYtLink 1.5s ease 3s forwards;
}

@keyframes showYtLink {
  0% {
    bottom: -200px;
  }
  100% {
    bottom: 20px;
  }
}
</style>
