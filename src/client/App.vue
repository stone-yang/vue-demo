<style src="normalize.css"></style>
<style src="mdi/css/materialdesignicons.min.css"></style>
<template>
  <div id="app">
    <topbar @toggleMenu="toggleMenu({ show: !mainMenu.show })" />
    <main-menu :show="mainMenu.show" />
    <div class="main-container" :class="{ 'left-menu': mainMenu.show }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Topbar from '@/components/Topbar';
import MainMenu from '@/components/MainMenu';

export default {
  name: 'app',
  components: { Topbar, MainMenu },
  computed: {
    ...mapGetters({
      mainMenu: 'components/mainMenu',
    }),
  },
  methods: {
    ...mapMutations({
      toggleMenu: 'components/toggleMainMenu',
    }),
  },
  watch: {
    mainMenu() {
      console.log(this.mainMenu);
    },
  },
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
  padding: 24px 48px;
  padding-top: 64px;
  &.left-menu {
    margin-left: @menu-width;
  }
}
</style>
