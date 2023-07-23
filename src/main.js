import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import store from './store'

//request拦截器 添加一个请求拦截器  
axios.interceptors.request.use((config) => {
  if(localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token')
    console.log('请求已携带token')
  }
	return config
}, function (error) {
	//如果请求出错在此执行某些操作
	return Promise.reject(error);
});
 

Vue.config.productionTip = false
Vue.prototype.$axios = axios; 
Vue.use(ElementUI)

const vue = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

export default vue
