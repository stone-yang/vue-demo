import Vue from 'vue';

const device = {
  state: {
    screenWidth: 0,
    deviceWidth: 0,
    isMobile: false,
  },
  getters: {
    screenWidth: state => state.screenWidth,
    deviceWidth: state => state.deviceWidth,
    isMobile: state => state.isMobile,
  },
  mutations: {
    setDeviceState(state, { screenWidth, deviceWidth, isMobile }) {
      state.screenWidth = screenWidth || state.screenWidth;
      state.deviceWidth = deviceWidth || state.deviceWidth;
      state.isMobile = isMobile || state.isMobile;
    },
  },
};

const dialog = {
  state: {},
  getters: { dialog: state => state },
  mutations: {
    openDialog(state, { name }) {
      Vue.set(state, name, true);
    },
    closeDialog(state) {
      console.log('close');
      const key = Object.keys(state)[0];
      key && Vue.delete(state, key);
    },
  },
};
const state = {
  showMainMenu: true,
  contentLayout: 0, // 0 - grid view; 1 - list view
};

const getters = {
  mainMenu: state => state.showMainMenu,
  contentLayout: state => state.contentLayout,
};

const mutations = {
  toggleMainMenu(state, { show }) {
    state.showMainMenu = show;
  },
  switchLayout(state, mode) {
    const layoutStatus = mode || state.contentLayout === 0 ? 1 : 0;
    state.contentLayout = layoutStatus;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  modules: {
    dialog,
    device,
  },
};
