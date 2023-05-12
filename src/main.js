import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store'

const app = createApp(App)
app.use(ElementUI)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    console.log(key, component);
    app.component(key, component)
}
app.use(store)
app.use(router).use(ElementUI).mount('#app')
