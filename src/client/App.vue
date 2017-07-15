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
  created() {
    window.addEventListener('resize', this.resize);

    // attrieve device status
    const ds = {
      screenWidth: window.innerWidth, 
      deviceWidth: screen.width,
    };
    if (screen.width < 500) {
      this.toggleMenu({ show: false });
      this.switchLayout(1);
      ds.isMobile = true;
    }
    this.setDeviceState(ds);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
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
      setDeviceState: 'components/setDeviceState',
    }),
    resize() {
      const w = window.innerWidth;
      const W_MENU = 1160;
      const W_LAYOUT = 900;
      if (w < W_MENU && this.mainMenu) {
        this.toggleMenu({ show: false });
      }
      if (w >= W_MENU && !this.mainMenu) {
        this.toggleMenu({ show: true });
      }
      if (w < W_LAYOUT) {
        this.switchLayout(1);
      }
    },
  },
};
</script>
<style lang='less' src="./styles/main.less"></style>
<style lang='less'>
@import './styles/consts.less';
#app {
  min-height: 100%;
  height: 100%;
}
</style>
