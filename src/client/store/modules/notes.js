// import shop from '../../api/shop'
import axios from '@/api';
import * as MUTYPES from '../mutation-types';

// initial state
const state = {
  $list: [],
  // $list: initialNts,
};

// getters
const getters = {
  allNotes: (state) => {
    let list = [...state.$list];
    list = list.sort((a, b) => {
      return new Date(b.createTime).getTime() - new Date(a.createTime).getTime();
    });
    console.log(list);
    return list;
  },
};

// actions
const actions = {
  query: async ({ commit }) => {
    const res = await axios.get('/api/note/query');
    commit(MUTYPES.NOTES.UPDATE_ALL, { $list: res.data });
  },
  create: async ({ commit }, note) => {
    const data = await axios.post('/api/note/create', note);
    commit(MUTYPES.NOTES.UPDATE_ONE, data);
  },
  edit({ commit }, note) {
    // shop.getProducts(products => {
    //   commit(MUTYPES.NOTES.REMOVE, { products });
    // })
    commit(MUTYPES.NOTES.UPDATE_ONE, note);
  },
  remove: async ({ commit }, { id }) => {
    await axios.delete(`/api/note/remove/${id}`);
    commit(MUTYPES.NOTES.REMOVE, { id });
  },
};

// mutations
const mutations = {
  [MUTYPES.NOTES.UPDATE_ALL](state, payload) {
    state.$list = payload.$list;
  },
  [MUTYPES.NOTES.UPDATE_ONE](state, note) {
    const $list = state.$list;
    if (note.id) {
      const idx = $list.findIndex(p => p.id === note.id);
      $list[idx] = note;
      state = { $list };
    } else {
      state.$list.unshift(note);
    }
  },
  [MUTYPES.NOTES.REMOVE](state, { id }) {
    const $list = state.$list;
    const idx = $list.findIndex(p => p._id === id);
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
