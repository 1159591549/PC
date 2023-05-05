import { createRouter, createWebHistory } from "vue-router";
import store from '../store'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: '',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/view/home/index.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/view/common/login.vue'),
        },
    ]
})
router.beforeEach((to, from, next) => {
    if (to.name === 'login') {
        // 当要跳转到登录页面时，有token且未过期，禁止页面跳转到登录页面
        if (store.getters.getToken) {
            next({
                name: from.name
            })
        } else {
            next()
        }
    } else {
        // 当要跳转非登录页面时 有token且未过期，页面正常跳转
        if (store.getters.getToken) {
            next()
        } else {
            next({
                name: 'login'
            })
        }
    }
})
export default router;
