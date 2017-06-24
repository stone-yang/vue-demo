<style src="normalize.css"></style>
<style src="mdi/css/materialdesignicons.min.css"></style>
<template>
  <div id="app">
    <topbar :themeColor="$route.meta.themeColor" :layout="contentLayout"
      @toggleMenu="toggleMenu({ show: !mainMenu })"
      @switchLayout="switchLayout"
      @searchbarFocus="$router.push('/search')" />
    <main-menu :show="mainMenu" @editLabel="openDialog({ name: 'editLabel' })" />
    <section class="main-container" :class="{ 'left-menu': mainMenu }">
      <router-view></router-view>
    </section>
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
      contentLayout: 'components/contentLayout',
    }),
  },
  methods: {
    ...mapMutations({
      toggleMenu: 'components/toggleMainMenu',
      switchLayout: 'components/switchLayout',
    }),
  },
  // watch: {
  //   mainMenu() {
  //     console.log(this.$store);
  //   },
  // },
};
</script>

<style lang='less'>
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
