<template>
    <div class="hs_menu" style="width: 200px;">
        <el-menu 
            active-text-color="#ffd04b" 
            background-color="#545c64" 
            :default-active="activeRouter" 
            text-color="#fff"
            :collapse-transition="false"
        >
            <template v-for="(menu, index) in menusList" :key="index">
                <el-menu-item @click="skip(menu, menu.children[0])" :index="getRouter(menu.path, menu.children[0].path)" v-if="!menu.children || (menu.children && menu.children.length === 1)">
                    <el-icon :size="20">
                        <Edit />
                    </el-icon>
                    <span>{{ menu.meta.title }}</span>
                </el-menu-item>
                <el-sub-menu v-else :index="menu.path">
                    <template #title>
                        <span>{{ menu.meta.title }}</span>
                    </template>
                    <el-menu-item @click="skip(menu, menuItem)" v-for="(menuItem, menuItemIndex) in menu.children" :key="menuItemIndex" :index="getRouter(menu.path, menuItem.path)">
                        {{ menuItem.meta.title }}
                    </el-menu-item>
                </el-sub-menu>
            </template>
        </el-menu>
    </div>
</template>
<script>
import { useStore } from 'vuex'
import {useRouter,useRoute} from 'vue-router'
export default {
    setup() {
        let store = useStore()
        let router = useRouter()
        let route = useRoute()
        function skip(menu, childrenMenu) {
            if (childrenMenu) {
                router.push({
                    path: getRouter(menu.path, childrenMenu.path)
                })
            }else{
                router.push({
                    path: menu.path 
                })
            }
        }
        function getRouter(path, towLevelPath){
            return (path === '/' ? '/' : (path + '/')) + towLevelPath
        }

        return {
            menusList: store.getters.menusList,
            skip,
            getRouter,
            activeRouter: route.path
        }
    }
}
</script>
<style lang="less" scoped>
.hs_menu {
    height: 100vh;
    background: #545c64;
}

.hs_menu /deep/ .el-menu {
    border-right: none;
}
</style>
