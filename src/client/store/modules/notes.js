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
  create({ commit }, note) {
    // shop.getProducts(products => {
    //   commit(MUTYPES.NOTES.REMOVE, { products });
    // })
    // console.log('create', note);
    commit(MUTYPES.NOTES.UPDATE_ALL, note);
  },
  edit({ commit }, note) {
    // shop.getProducts(products => {
    //   commit(MUTYPES.NOTES.REMOVE, { products });
    // })
    commit(MUTYPES.NOTES.UPDATE_ONE, note);
  },
  remove({ commit }, { id }) {
    console.log('remove');
    // shop.getProducts(products => {
    //   commit(MUTYPES.NOTES.REMOVE, { products });
    // })
    commit(MUTYPES.NOTES.REMOVE, { id });
  },
};

// mutations
const mutations = {
  [MUTYPES.NOTES.UPDATE_ALL](state, note) {
    console.log('create');
    state.$list.push(note);
  },
  [MUTYPES.NOTES.UPDATE_ONE](state, note) {
    const $list = state.$list;
    const idx = $list.findIndex(p => p.id === note.id);
    $list[idx] = note;
    state = { $list };
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
