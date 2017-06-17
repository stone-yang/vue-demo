import axios from 'axios';
import qs from 'qs';
import globalConfig from '@global/config';

// base settings
axios.defaults.timeout = 5000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://localhost:' + globalConfig.app.port + '/';
axios.defaults.paramsSerializer = params => qs.stringify(params);

// axios.interceptors.request.use((config) => {
//   if (config.params) {
//     console.log(config.params, qs.stringify(config.params));
//     config.params = qs.stringify(config.params);
//   }
//   return config;
// });

axios.interceptors.response.use((res) => {
  return res.data;
}, (error) => {
  return Promise.reject(error);
});

export default axios;
