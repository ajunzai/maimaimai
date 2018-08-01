import Vue from 'vue';
import App from './App.vue';
// 引入路由模块
import VueRouter from 'vue-router';
// 引入index
import index from './components/index.vue';
// 引入goodsinfo
import goodsinfo from './components/goodsinfo.vue';
// 引入buycar
import buyCar from './components/buyCar.vue';
// 引入payOrder 
import payOrder from './components/payOrder.vue';
// 引入login
import login from './components/login.vue';
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
import Vuex from 'vuex';

// 时间全局过滤期
Vue.filter('cutTime', function (value) {
  return moment(value).format('YYYY年MM月DD日');
});
// 配置axios每一个url的默认值
axios.defaults.baseURL = 'http://47.106.148.205:8899';
// 配置axios跨域携带cookie
axios.defaults.withCredentials = true;
// 在vue中创建axios原型对象 公用 vue-resource this.$http
Vue.prototype.axios = axios;
// 使用懒加载中间件
Vue.use(VueLazyload, {
  preLoad: 1.9,
  loading: require('./assets/img/01.gif')
});
// 使用路由中间件
Vue.use(VueRouter);
// 使用ivew中间件
Vue.use(iView);
// 使用ul中间件
Vue.use(ElementUI);
// 使用vueX中间件
Vue.use(Vuex);
// 实例化Vuex对象
let buyList = JSON.parse(window.localStorage.getItem('buyList')) || {};
const store = new Vuex.Store({
  state: {
    buyList,
    // 是否登入
    isLogin: false,
    // 来的路由
    fromPath: ''
  },
  mutations: {
    // info=> {goodid:xxx,goodNum:xxx}  buyList{goodid:goodNum}
    increment(state, info) {
      if (state.buyList[info.goodid]) {
        let oldNum = parseInt(state.buyList[info.goodid]);
        oldNum += parseInt(info.goodNum);
        state.buyList[info.goodid] = oldNum;
        // Vue.delete(state.buyList, undefined)
      } else {
        // state.buyList[info.goodid] = info.goodNum;
        Vue.set(state.buyList, info.goodid, parseInt(info.goodNum));
      }
    },
    changeCount(state, info) {
      state.buyList[info.goodid] = info.goodNum;
    },
    delete(state, id) {
      // delete state.buyList.id;
      Vue.delete(state.buyList, id);
    },
    // 暴露修改方法
    changeLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    // 修改来时的路由
    rememberFromPath(state, path) {
      state.fromPath = path;
    }
  },
  getters: {
    totalCount(state) {
      let num = 0;
      for (const key in state.buyList) {
        num += parseInt(state.buyList[key]);
      }
      return num;
    }
  }
});

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
    },
    {
      path: '/buyCar',
      component: buyCar
    },
    {
      path: '/payOrder',
      component: payOrder
    },
    {
      path: '/login',
      component: login
    }
  ]
});


// 注册路由守卫(因为用户看到了一闪而过的效果 在订单页跳转到登入也 异步操作)
router.beforeEach((to, from, next) => {
  // 保存数据
  store.commit("rememberFromPath", from.path);
  // 如果没有进去登入页
  if (to.path == '/payOrder') {
    // 去订单支付页
    axios.get("/site/account/islogin")
      .then(response => {
        // console.log(response);
        if (response.data.code == 'nologin') {
          next('./login')
        } else {
          // 登入了
          next();
        }
      }).catch(err => {
        console.log(err);
      })
  } else {
    // 如果去的不是订单支付页  直接可以访问
    next();
  }
})

Vue.config.productionTip = false;

new Vue({
  // 选择器
  el: '#app',
  // 挂载路由
  router,
  // 挂载vuex
  store,
  render: (h) => h(App)
});

//当浏览器关闭或者是刷新页面
window.onbeforeunload = function () {
  window.localStorage.setItem('buyList', JSON.stringify(store.state.buyList));
};