
import { createApp } from 'vue'
import { createPinia } from "pinia";

import App from './App.vue'
import router from "./router";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import global from "./global";
const app = createApp(App);

Object.keys(global).forEach((method) => {
    app.config.globalProperties[method] = global[method];
  })
  
  app.use(createPinia()).use(router);
  
  router.isReady().then(() => app.mount("#app"));