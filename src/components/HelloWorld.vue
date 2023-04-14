<template>
  <div>
    <div>{{ msg }}</div>
    <div v-for="item in menuList" :key="item.name">{{ item.component }}</div>
    <div>-----------------个人信息-----------------------</div>
    <div>男姓名：{{ man.name }};年龄：{{ man.age }}</div>
    <div>女姓名：{{ woman.name }};年龄：{{ woman.age }}</div>
  </div>
</template>

<script>
import { onMounted, toRefs, reactive } from 'vue';
import { post, get } from '@/libs/api'
export default {
  name: "HelloWorld",
  setup() {
    let data = reactive({
      msg: '这是自定义数据',
      menuList: [],
      man: {},
      woman: {}
    })
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
      data.woman = await post('/postRequest',  { name: '苏应梅', age: '26' })
    }
    onMounted(() => {
      getMenu();
      getRequest();
      postRequest()
    });
    return {
      ...toRefs(data)
    }
  }
};
</script>

<style scoped></style>
