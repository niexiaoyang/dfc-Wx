// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { TransferDom } from 'vux';
import FastClick from 'fastclick';
import VConsole from 'vconsole';

import './styles/index.scss';

import App from './App';
import router from './router';

// no need store for mobile for now.
// import store from './store';
import * as filters from './filters'; // global filters
import { install } from './components/index'; // all global components
import Icon from './components/Icon';

import './utils/bridge';
import './permission'; // permission control

Vue.config.productionTip = false;

Vue.directive('transfer-dom', TransferDom);

// register components
install(Vue);

// svg icon
Icon.install();

// register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

// vsconsole
const DEBUG = true;
if (DEBUG) {
  const vconsole = new VConsole();
  console.log(vconsole);
}

FastClick.attach(document.body);

if (!window.bridge) {
  // 混合页面初始化对象(主要是安卓)
  window.bridge = {};
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>',
});
