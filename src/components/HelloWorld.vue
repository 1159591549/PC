<template>
  <div>
    <button @click="addCount">同步修改{{ store.state.count }}</button>
    <button @click="asyncAddCount">异步修改{{ store.state.count }}</button>
  </div>
</template>

<script>
import { onMounted, toRefs, reactive } from 'vue';
import { post, get } from '@/libs/api'
import { useStore } from 'vuex';
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
    // 查询用户信息
    async function queryInfo() {
      let res = await get('/getUsers');
      console.log(res);
    }
    async function getMenu() {
      let { router } = await post('/getRouters');
      data.menuList = router;
    }
    // 测试get请求
    async function getRequest() {
      data.man = await get('/getRequest', { name: '胡智尧', age: '26' })
    }
    // 测试post请求
    async function postRequest() {
      data.woman = await post('/postRequest', { name: '苏应梅', age: '26' })
    }
    onMounted(() => {
    })
    function addCount() {
      store.commit('addCount', 1)
    }
    function asyncAddCount() {
      store.dispatch('asyncAddCount', 2)
    }
    return {
      ...toRefs(data),
      store,
      addCount,
      asyncAddCount
    }
  }
};
</script>

<style scoped></style>
