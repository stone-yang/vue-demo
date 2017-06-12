<style src="normalize.css"></style>
<style src="mdi/css/materialdesignicons.min.css"></style>
<template>
  <div id="app">
    <topbar />
    <main-menu />
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Topbar from '@/components/Topbar';
import MainMenu from '@/components/MainMenu';

export default {
  name: 'app',
  components: { Topbar, MainMenu },
};
</script>

<style lang='less' >
@import './styles/main.less';
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  background-color: #e2e2e2;
  color: @font-color-default;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.main-container {
  margin-left: @menu-width;
  padding: 24px 48px;
  padding-top: 64px;
}
</style>
