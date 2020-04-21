import Vue from 'vue'
import VueRouter from 'vue-router'
import homeRouter from './home'
import loginRouter from './login'
import registerRouter from './register'

import axios from 'axios'

Vue.use(VueRouter)

const routes = [
    homeRouter,
    loginRouter,
    registerRouter,
    { path: '/*', redirect: '/login' }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 设置导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/register') return next();
    axios.get('/users/getUser').then((res) => {
        var status = res.data.status
        if (status === 0) {
            next()
        } else {
            next('/login')
        }
    })
})

export default router