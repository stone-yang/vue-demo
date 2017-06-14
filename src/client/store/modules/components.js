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

const mainMenu = {
  state: {
    show: true,
  },
  getters: { mainMenu: state => state },
  mutations: {
    toggleMainMenu(state, { show }) {
      // const newState = Object.assign({}, state, { show });
      // console.log(newState, 1111);
      state.show = show;
    },
  },
};

export default {
  namespaced: true,
  modules: {
    dialog,
    mainMenu,
  },
};
