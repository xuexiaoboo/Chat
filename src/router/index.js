import Vue from 'vue'
import VueRouter from 'vue-router'
import homeRouter from './home'
import loginRouter from './login'

Vue.use(VueRouter)

const routes = [
    homeRouter,
    loginRouter,
    // { path: '/*', redirect: '/login' }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router