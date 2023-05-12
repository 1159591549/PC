import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";
import Main from '../components/main'
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/view/common/login.vue'),
        },
    ]
})

// 路径映射到组件
export const urlToComponent = (menu = []) => {
    menu.forEach(item => {
        // 一级组件的时候需要使用main容器，其余组件则使用自身的路径
        if (item.meta && item.meta.component) {
            item.component = () => import(`@/view${item.meta.component}`)
        } else {
            item.component = Main
        }
        if (item.children && item.children.length > 0) {
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
