<template>
  <div class="hello">
  </div>
</template>

<script>
import { onMounted, toRefs } from 'vue';
import { post } from '@/libs/api'
export default {
  name: "HelloWorld",
  setup() {
    let data = {
      menuList: {}
    }
    async function getMenu() {
      let { router } = await post('/getRouters')
      data.menuList = router
    }
    onMounted(() => {
      getMenu()
    });
    return {
      ...toRefs(data)
    }
  }
};
</script>

<style scoped></style>
