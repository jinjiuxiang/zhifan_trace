// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import './../static/element/index.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import VueI18n from 'vue-i18n'
import zh from '../static/lang/zh'
import en from '../static/lang/en'
import config from '../static/config'
import $ from 'jquery';
import qs from 'qs'
window.jQuery = $;
window.$ = $;
import echarts from 'echarts'
import md5 from 'js-md5'
// import 'babel-polyfill'
import VueClipboards from 'vue-clipboards';
// import { Popover } from 'element-ui';
import "babel-polyfill";
// Vue.use(Popover);
Vue.use(VueClipboards);
Vue.use(VueI18n);
Vue.config.productionTip = false;
Vue.use(ElementUI);
/* eslint-disable no-new */
const i18n = new VueI18n({
  locale:'zh',
  messages:{
    'zh':zh,
    'en':en
  }
})

new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
Vue.prototype.ajax = axios;
Vue.prototype.Cookies = Cookies;
Vue.prototype.Config = config;
Vue.prototype.$echarts = echarts;
Vue.prototype.$md5 = md5;
Vue.prototype.qs = qs;

