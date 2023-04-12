import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 完整引入
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// createApp(App).use(store).use(router).use(ElementPlus).mount('#app')


createApp(App).use(store).use(router).mount('#app')