import { createStore } from 'vuex'
import { post, get } from '@/libs/request'
import { api } from '@/libs/api'
import { ElMessage } from 'element-plus'
import router from '../router'
import { common } from '@/libs/api'
import { urlToComponent } from '../router'
export default createStore({
    state: {
        // 登录token
        token: '',
        // 当前用户菜单
        menusList: [],
        // 登录状态 true 登录 false 未登录
        loginState: false
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload
        },
        setMenus(state, payload) {
            state.menusList = payload
        },
        setLoginState(state, payload) {
            state.loginState = payload
        }
    },
    actions: {
        async login({ commit, dispatch }, payload) {
            let { username, password } = payload
            let { code, data, msg } = await post(common + '/login', { username, password })
            if (code === 10000) {
                // 传递给后端的token要将 Bearer token拼起来传递给后端
                // 注意：中间要有空格不然后端无法识别，切记！！！
                sessionStorage.setItem('token', 'Bearer ' + data.token)
                commit('setToken', 'Bearer ' + data.token)
                commit('setLoginState', true)
                // 根据权限获取页面路由
                dispatch('getRouters')
                ElMessage.success(msg)
            } else {
                ElMessage.error(msg)
            }
        },
        async getRouters(state, payload) {
            let { code, data, msg } = await get(api + '/getRouters')
            if (code === 10000) {
                state.commit('setMenus', data.menusList)
                sessionStorage.setItem('menusList', JSON.stringify(data.menusList))
                urlToComponent(data.menusList)
                data.menusList.forEach(route => {
                    router.addRoute(route)
                })
                router.push({
                    name: 'home'
                })
            } else {
                ElMessage.error(msg)
            }
        }
    },
    getters: {
        getToken(state) {
            return state.token || sessionStorage.getItem('token')
        },
        menusList(state){
            return state.menusList || JSON.parse(sessionStorage.getItem('menusList')) 
        }
    }
})