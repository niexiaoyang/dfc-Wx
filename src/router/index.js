import Vue from 'vue';
import Router from 'vue-router';

const asyncImport = file => () => import(`@/views/${file}`);

Vue.use(Router);
export const constantRouterMap = [
  {
    path: '',
    component: asyncImport('Home'),
  },
  {
    path: '/fatherDay',
    component: asyncImport('Days/Father'),
  },
  {
    path: '/rank',
    component: asyncImport('Rank'),
  },
  {
    path: '/debt',
    component: asyncImport('Debt'),
  },
];

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});

export const asyncRouterMap = [
];
