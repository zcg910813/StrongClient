// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Cookies from 'vue-cookies'
import config from './config/api.js'
import store from './store'
import VueAMap from 'vue-amap'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/common.styl'
import echarts from 'echarts'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.$config = config
Vue.use(Cookies)
Vue.use(ElementUI)
Vue.use(VueAMap)
Vue.use(VueQuillEditor)

Vue.filter('format', (number) => {
  if (number === null || number === undefined || number === '') return ''
  return parseInt(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'bad51be323e5c3cfa40fa8167c10982f',
  // 插件集合
  plugin: ['AMap.Geocoder', 'AMap.Geolocation', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
})
