import Vue from 'vue';

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
  contentLayout: 0,
};

const getters = {
  mainMenu: state => state.showMainMenu,
  contentLayout: state => state.contentLayout,
};

const mutations = {
  toggleMainMenu(state, { show }) {
    state.showMainMenu = show;
  },
  switchLayout(state) {
    state.contentLayout = state.contentLayout === 0 ? 1 : 0;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  modules: {
    dialog,
  },
};
