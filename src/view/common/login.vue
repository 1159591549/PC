<template>
    <el-button @click="login" type="primary">登录</el-button>
</template>
<script>
import { useStore } from 'vuex';
export default {
    name: 'login',
    setup() {
        let store = useStore()
        async function login() {
            store.dispatch('login', { username: 'huzhiyao', password: '123456' })
        }
        return {
            login
        }
    }
}
</script>