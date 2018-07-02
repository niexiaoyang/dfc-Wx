// import { Message } from 'element-ui';
import Cookies from 'js-cookie';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
// import { getToken } from '@/utils/auth'; // getToken from cookie

import router from './router';
// import store from './store';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// permissiom judge function
// function hasPermission(roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) return true; // admin permission passed directly
//   if (!permissionRoles) return true;
//   return roles.some(role => permissionRoles.indexOf(role) >= 0);
// }

// const whiteList = ['/dashboard', '/login']; // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  const { query } = to;

  if (query.token) {
    console.log(decodeURIComponent(query.token));
    Cookies.set('token', decodeURIComponent(query.token));
  }

  next();
  NProgress.done();
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
