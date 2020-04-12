import Vue from 'vue'
import App from './App'

// 1.0导入封装的请求
import request from "./utils/request"

// 1.1放到原型上挂载
Vue.prototype.request = request;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
