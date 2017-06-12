// import shop from '../../api/shop'
import * as MUTYPES from '../mutation-types';

const initialNts = [
  {
    id: 1,
    title: 'Note 01',
    content: 'This is Note 01.',
  }, {
    id: 2,
    title: 'Note 02',
    content: 'This is Note 02.',
  },
];
// initial state
const state = {
  // $list: [],
  $list: initialNts,
};

// getters
const getters = {
  allNotes: state => state.$list,
};

// actions
const actions = {
  remove({ commit }, { id }) {
    // shop.getProducts(products => {
    //   commit(MUTYPES.NOTES.REMOVE, { products });
    // })
    commit(MUTYPES.NOTES.REMOVE, { id });
  },
};

// mutations
const mutations = {
  [MUTYPES.NOTES.UPDATE_ALL](state, { $list }) {
    state.$list = $list;
  },
  [MUTYPES.NOTES.REMOVE](state, { id }) {
    const $list = state.$list;
    const idx = $list.findIndex(p => p.id === id);
    console.log(id, idx);
    state = { $list: $list.splice(idx, 1) };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
