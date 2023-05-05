import { createRouter,createWebHistory } from "vue-router";
const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            name:'',
            redirect:'/home'
        },
        {
            path:'/home',
            name:'home',
            component: () => import('@/view/home/index.vue'),
        },
        {
            path:'/login',
            name:'login',
            component: () => import('@/view/common/login.vue'),
        },
    ]
})
export default router;
