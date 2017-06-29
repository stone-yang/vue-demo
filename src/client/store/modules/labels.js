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
  all: (state) => {
    return state.$list;
  },
};

// actions
const actions = {
  query: async ({ commit }, params) => {
    const { data } = await axios.get('/api/labels', { params });
    commit(MUTYPES.LABEL.UPDATE_ALL, { $list: data });
  },
  create: async ({ commit }, { body, params }) => {
    const { data } = await axios.post('/api/labels', body, { params });
    commit(MUTYPES.LABEL.UPDATE_ALL, { $list: data });
  },
  edit: async ({ commit }, { id, body, params }) => {
    const { data } = await axios.put(`/api/labels/${id}`, body, { params });
    commit(MUTYPES.LABEL.UPDATE_ALL, { $list: data });
  },
  remove: async ({ commit }, { id, params }) => {
    const { data } = await axios.delete(`/api/labels/${id}`, { params });
    commit(MUTYPES.LABEL.UPDATE_ALL, { $list: data });
  },
};

// mutations
const mutations = {
  [MUTYPES.LABEL.UPDATE_ALL](state, payload) {
    state.$list = payload.$list;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
