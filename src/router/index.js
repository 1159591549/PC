import { createRouter,createWebHistory } from "vue-router";
const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            name:'helloWorld',
            component: () => import('@/components/HelloWorld.vue'),
        },
        {
            path:'/one',
            name:'one',
            component: () => import('@/view/home/index.vue'),
        }
    ]
})
export default router;
