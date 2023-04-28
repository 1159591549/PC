import { createStore } from 'vuex'
export default createStore({
    state: {
        count: 0
    },
    mutations: {
        addCount(state, payload) {
            state.count += payload
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