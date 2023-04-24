import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-notification.css";
import "element-plus/theme-chalk/el-message-box.css";
import "element-plus/theme-chalk/el-drawer.css";
import "element-plus/theme-chalk/el-input.css";

// 完整引入
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// createApp(App).use(store).use(router).use(ElementPlus).mount('#app')


createApp(App).use(store).use(router).mount('#app')