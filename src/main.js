import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import VueRouter from 'vue-router'
// 引入index
import index from './components/index.vue'
// 引入goodsinfo
import goodsinfo from './components/goodsinfo.vue'
// 引入ui模块
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入lazyload
import VueLazyload from 'vue-lazyload';
// 引入css
import './assets/statics/site/css/style.css';
// 引入axios模块 目的是让所有组件都可以使用
import axios from 'axios';
// 引入时间过滤器
import moment from 'moment';
// 引入ivew
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 引入vuex
import Vuex from 'vuex'


// 时间全局过滤期
Vue.filter('cutTime', function (value) {
  return moment(value).format('YYYY年MM月DD日');
})
// 配置axios每一个url的默认值
axios.defaults.baseURL = 'http://47.106.148.205:8899';
// 在vue中创建axios原型对象 公用 vue-resource this.$http
Vue.prototype.axios = axios;
// 使用懒加载中间件
Vue.use(VueLazyload, {
  preLoad: 1.9,
  loading: require('./assets/img/01.gif')
});
// 使用路由中间件
Vue.use(VueRouter)
// 使用ivew中间件
Vue.use(iView);
// 使用ul中间件
Vue.use(ElementUI);
// 使用vueX中间件
Vue.use(Vuex);

// 注册路由规则
const router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: index
    },
    {
      path: '/goodsinfo/:goodsid',
      component: goodsinfo
    }
  ]
})
// 实例化Vuex对象
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state, num) {
      state.count += num;
    }
  }
})

Vue.config.productionTip = false

new Vue({
  // 选择器
  el: "#app",
  // 挂载路由
  router,
  // 挂载vuex
  store,
  render: h => h(App)
})