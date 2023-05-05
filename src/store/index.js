import { createStore } from 'vuex'
import { post } from '@/libs/api'
export default createStore({
    state: {
        count: 0,
        token: ''
    },
    mutations: {
        addCount(state, payload) {
            state.count += payload
        },
        setToken(state, payload) {
            state.token = payload
        }
    },
    actions: {
        asyncAddCount(state, payload) {
            let timer = setTimeout(() => {
                state.commit('addCount', payload)
                clearTimeout(timer)
            }, 1000)
        }
    },
    getters: {

    }
})