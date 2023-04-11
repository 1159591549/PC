<template>
  <div class="hello">
    <button @click="skip">跳转</button>
    <button @click="getMenu">数据请求</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  methods: {
    skip() {
      this.$router.push({
        name:'one'
      })
    },
    getMenu(){
      // async function getRouters() {
      //   let { data: { router } } = await axios.post('http://127.0.0.1/getRouters')
      //   urlToCom(router)
      //   routerList.addRoutes(router)
      // }
      // function urlToCom(router = []) {
      //   router.forEach(item => {
      //     if (!item.children || (item.children && item.children.length === 0)) {
      //       // 一定要用模板字符串方式拼接路径，并且第一位要带目录不能直接是变量，否则识别不了
      //       item.component = () => import(`@/${item.file}`)
      //     } else {
      //       urlToCom(item.children)
      //     }
      //   });
      // }
      this.axios.post('http://127.0.0.1/getRouters').then(res => {
        console.log(res,"111111111111111111111111");
      })
    }
  },
};
</script>

<style scoped></style>
