import axios from './config';

const noteApi = {
  query() {
    return axios.get('/api/note/query');
  },
  create(newObj) {
    return axios.post('/api/note/create', newObj);
  },
};

export default noteApi;
