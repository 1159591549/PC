<template>
  <div>
    <button @click="getRequest">get请求</button>
    <br>
    <button @click="postRequest">post请求</button>
    <br>
    <button @click="getMenu">获取菜单</button>
    <br>
    <button @click="toPermission">to permission</button>
  </div>
</template>
  
<script>
import { onMounted, toRefs, reactive } from 'vue';
import { post, get } from '@/libs/request'
import { api } from '@/libs/api'
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
export default {
  name: "HelloWorld",
  setup() {
    let data = reactive({
    })
    let store = useStore()
    let router = useRouter()
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
    function toPermission() {
      router.push({
        name: 'permission'
      })
    }
    onMounted(() => {
    })
    return {
      ...toRefs(data),
      store,
      getRequest,
      postRequest,
      getMenu,
      toPermission
    }
  }
};
</script>
  
<style scoped></style>
  