<template>
    <button @click="toHome">to home</button>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
    setup() {
        let router = useRouter()
        function toHome() {
            router.push({
                name: 'home'
            })
        }
        return {
            toHome
        }
    }
}
</script>