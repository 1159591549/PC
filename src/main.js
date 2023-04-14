import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { post, get } from '@/libs/api'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.config.globalProperties.post = post
app.config.globalProperties.get = get
app.use(ElementUI)
app.use(router).use(ElementUI).mount('#app')
