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

export default {
  namespaced: true,
  modules: {
    dialog,
  },
};
