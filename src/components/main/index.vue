<template>
    <el-container>
        <side></side>
        <el-container>
            <el-header>Header</el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import side from './side.vue'
export default {
    name: 'sideContainer',
    components: {
        side
    },
}
</script>