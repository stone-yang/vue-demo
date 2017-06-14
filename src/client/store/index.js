import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
// import * as actions from './actions';
// import * as getters from './getters';
import modules from './modules';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  // actions,
  // getters,
  modules,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

export default store;

// if (module.hot) {
//   module.hot.accept(
//     Object.keys(modules).map(m => `./modules/${m}`),
//     () => {
//       store.hotUpdate(modules);
//     });
// }
