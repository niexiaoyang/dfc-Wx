// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import './styles/index.scss';

import App from './App';
import router from './router';

// no need store for mobile for now.
// import store from './store';
import * as filters from './filters'; // global filters
import { install } from './components/index'; // all global components
import Icon from './components/Icon';

import './permission'; // permission control

Vue.config.productionTip = false;

// register components
install(Vue);

// svg icon
Icon.install();

// register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>',
});
