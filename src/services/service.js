import axios from "axios";

// const url = 'http://localhost:3000/api/'; //local 
const url = 'http://localhost:8000/api/'; //local laravel

export default {

    checkUserLoggedIn(params){
        return axios.post(url + 'checkUserExist', params).then(response => response.data);
    },
    VerifyOtp(params) {
        return axios.post(url + 'verify-otp', params).then(response => response.data);
    }
};
