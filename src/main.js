import 'flex.css'
import 'element-ui/lib/theme-chalk/index.css'
import './common/Iconfont/iconfont.css'
import './common/css/common.css'
import './common/css/reset.css'

import Vue from 'vue'
import fastClick from 'fastclick'
import ElementUI from 'element-ui'
import store from './store/index'
import VueLazyLoad from 'vue-lazyload';
import router from './router'
import storage from 'good-storage'
import App from './app.vue'
fastClick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('./common/image/default.png')
});
Vue.use(ElementUI)
Vue.config.productionTip = false
// 若是没有开启Devtools工具，在开发环境中开启，在生产环境中关闭

if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true;
} else {
  Vue.config.devtools = false;
}

router.beforeEach((to, from, next) => { // 这里做个路由拦截，需要先登录
  if(to.matched.some(res => res.meta.requireAuth)) {
    if(storage.get('user')) {
      next()
    } else {
      next({
        path: '/sigin',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})
new Vue({
el:"#app",
router,
store,
template:'<App/>',
components:{App}
})
