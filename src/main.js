import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'

const app = createApp(App)
app.use(ElementUI)
app.use(store)
app.use(router).use(ElementUI).mount('#app')
