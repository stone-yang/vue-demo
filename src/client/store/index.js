import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
// import * as actions from './actions';
// import * as getters from './getters';
import components from './modules/components';
import notes from './modules/notes';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  // actions,
  // getters,
  modules: {
    components,
    notes,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
