import Icon from './Icon';
import ErrorPage from './ErrorPage';

const components = [
  Icon,
  ErrorPage,
];

const install = function install(Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

export {
  install,
  Icon,
  ErrorPage,
};
