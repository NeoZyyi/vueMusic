import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from '@/store/store'
import utils from '@/util'
Vue.use(ElementUI)
Vue.prototype.$axios = axios;
Vue.prototype.utils = utils
axios.defaults.baseURL = 'http://localhost:3000'
Vue.config.productionTip = false
 
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
