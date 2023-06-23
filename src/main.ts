import {createApp} from 'vue'
import App from './App.vue'
// import {ElMessage} from "element-plus";

import 'element-plus/dist/index.css'
import './assets/global.css'
import './mock/goods.ts'
// @ts-ignore
const app = createApp(App)

// app.component('ElMessage',
//     ElMessage)
app.mount('#app')
