import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/view/common/login.vue'),
        },
    ]
})
export const urlToComponent = (menu = []) => {
    menu.forEach(item => {
        if (!item.children || (item.children && item.children.length === 0)) {
            if (item.file) {
                item.component = () => import(`@/view${item.file}`)
            }
        } else {
            urlToComponent(item.children)
        }
    })
}

router.beforeEach((to, from, next) => {
    if (to.path !== '/login') {
        // 登陆了
        if (sessionStorage.getItem('token')) {
            // 判断登录状态  存在token
            if (store.state.loginState) {
                next()
            } else {
                let menu = JSON.parse(sessionStorage.getItem('menusList'))
                if (menu) {
                    urlToComponent(menu)
                    menu.forEach((rt) => {
                        router.addRoute(rt)
                    })
                    store.commit('setMenus', menu)
                    store.commit('setLoginState', true)
                    next({ path: to.path })
                } else {
                    // 不存在菜单 退回login
                    window.sessionStorage.clear()
                    next({
                        name: 'login'
                    })
                }
            }
            // 未登录
        } else {
            window.sessionStorage.clear()
            next({
                name: 'login'
            })
        }
        // 登录页面
    } else {
        if (sessionStorage.getItem('token') && sessionStorage.getItem('menusList')) {
            // 这个地方当刷新页面的时候，from.name是undefined,要用from.path进行跳转
            next({
                path: from.path
            })
        } else {
            next()
        }
    }
})
export default router;
