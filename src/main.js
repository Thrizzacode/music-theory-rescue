import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

// 引入全域樣式
import './css/style.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
