import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import VueRouter from 'vue-router'
// 引入index
import index from './components/index.vue'
// 引入ui模块
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入lazyload
import VueLazyload from 'vue-lazyload';
const path = require('path');
// 使用懒加载中间件
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: path.join(__dirname, 'src/assets/img/01.gif')
});
// 使用路由中间件
Vue.use(VueRouter)
// 使用ul中间件
Vue.use(ElementUI);
// 注册路由规则
const router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: index
    }
  ]
})
// 引入css
import './assets/statics/site/css/style.css';
Vue.config.productionTip = false

new Vue({
  // 选择器
  el: "#app",
  // 挂载路由
  router,
  render: h => h(App)
})