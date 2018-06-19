<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style lang="less">
@datetime-header-item-cancel-font-color: red;
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/close.less';
@import './styles/vux-ui.less';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
