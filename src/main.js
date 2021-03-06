import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios';
import Vant from 'vant';
import 'vant/lib/index.css';
import animated from "animate.css";
const app = createApp(App)
app.use(router, VueAxios, axios)
    .use(Vant)
    .use(animated)
app.mount('#app')
