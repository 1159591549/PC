<template>
    <button @click="login">登录</button>
</template>
<script>
import { useRouter } from 'vue-router'
import { common } from '@/libs/api'
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus'
import { post } from '@/libs/request'
export default {
    name: 'login',
    setup() {
        const router = useRouter()
        let store = useStore()
        async function login() {
            let { code, data, msg } = await post(common + '/login', { username: 'huzhiyao', password: '123456' })
            if (code === 10000) {
                sessionStorage.setItem('token', 'Bearer ' + data.token)
                store.commit('setToken', 'Bearer ' + data.token)
                ElMessage.success(msg)
                router.push({
                    name: 'home'
                })
            } else {
                ElMessage.error(msg)
            }
        }
        return {
            login
        }
    }
}
</script>