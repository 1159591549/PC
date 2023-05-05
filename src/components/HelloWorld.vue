<template>
  <div>
    <!-- <button @click="addCount">同步修改{{ store.state.count }}</button>
    <button @click="asyncAddCount">异步修改{{ store.state.count }}</button> -->
    <div>token:{{ store.state.token }}</div>
    <button @click="login">登录</button>
    <br>
    <button @click="getRequest">get请求</button>
    <br>
    <button @click="postRequest">post请求</button>
    <br>
    <button @click="getMenu">获取菜单</button>
  </div>
</template>

<script>
import { onMounted, toRefs, reactive } from 'vue';
import { post, get } from '@/libs/request'
import { api, common } from '@/libs/api'
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus'
export default {
  name: "HelloWorld",
  setup() {
    let data = reactive({
      msg: '这是自定义数据',
      menuList: [],
      man: {},
      woman: {}
    })
    let store = useStore()
    async function getMenu() {
      let { code, data, msg } = await get(api + '/getRouters');
      if (code === 10000) {
        console.log(data);
      } else {
        ElMessage.error(msg)
      }

    }
    // 测试get请求
    async function getRequest() {
      let { code, data, msg } = await get(api + '/getRequest', { username: 'huzhiyao', password: '123456' })
      if (code === 10000) {
        console.log(data);
      } else {
        ElMessage.error(msg)
      }
    }
    // 测试post请求
    async function postRequest() {
      let { code, data, msg } = await post(api + '/postRequest', { name: '苏应梅', age: '26' })
      if (code === 10000) {
        console.log(data);
      } else {
        ElMessage.error(msg)
      }
    }
    onMounted(() => {
    })
    function addCount() {
      store.commit('addCount', 1)
    }
    function asyncAddCount() {
      store.dispatch('asyncAddCount', 2)
    }
    async function login() {
      let { code, data, msg } = await post(common + '/login', { username: 'huzhiyao', password: '123456' })
      if (code === 10000) {
        sessionStorage.setItem('token', 'Bearer ' + data.token)
        store.commit('setToken', 'Bearer ' + data.token)
        ElMessage.success(msg)
      } else {
        ElMessage.error(msg)
      }
    }
    return {
      ...toRefs(data),
      store,
      addCount,
      asyncAddCount,
      login,
      getRequest,
      postRequest,
      getMenu
    }
  }
};
</script>

<style scoped></style>
