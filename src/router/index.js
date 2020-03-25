import Vue from 'vue'
import VueRouter from 'vue-router'
import chatListRouter from './chatList'
import friendsListRouter from './friendsList'
import watchRouter from './watch'
import loginRouter from './login'

Vue.use(VueRouter)

const routes = [
    chatListRouter,
    friendsListRouter,
    watchRouter,
    loginRouter
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router