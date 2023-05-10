<template>
    <el-button @click="login" type="primary">登录</el-button>
</template>
<script>
import { useRouter } from 'vue-router'
import { common } from '@/libs/api'
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus'
import { post, get } from '@/libs/request'
import { api } from '@/libs/api'
export default {
    name: 'login',
    setup() {
        const router = useRouter()
        let store = useStore()
        // store.commit('setRouter', router)
        async function login() {
            store.dispatch('login', { username: 'huzhiyao', password: '123456' })
            // let { code, data, msg } = await post(common + '/login', { username: 'huzhiyao', password: '123456' })
            // if (code === 10000) {
            //     sessionStorage.setItem('token', 'Bearer ' + data.token)
            //     store.commit('setToken', 'Bearer ' + data.token)
            //     store.dispatch('getRouters')
            //     ElMessage.success(msg)
            // } else {
            //     ElMessage.error(msg)
            // }
        }
        return {
            login
        }
    }
}
</script>