<template>
    <div>
        Home    
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import firebase from "../firebaseConfig";
import service from "../services/service";

const resData = ref('');

onMounted(() => {
    const req = {
        phone: "7994902404"
    }
    resData.value = service.checkUserLoggedIn(req);
    console.log(resData.value);
    // checkUserLoggedIn();
});

// const checkUserLoggedIn = async () => {

// }
</script>