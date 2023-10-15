import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/login.vue'
// import Login2 from '@/views/login2.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    // { path: '/login2', name: 'Login2', component: Login2 },
]
const router = createRouter( {
    history: createWebHistory(),
    routes
} )

export default router