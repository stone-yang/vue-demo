import axios from 'axios';
// import qs from 'qs';
import globalConfig from '@global/config';

// base settings
axios.defaults.timeout = 5000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = `http://localhost:${globalConfig.app.port}/`;

// axios.interceptors.request.use((config) => {
//     if(config.method  === 'post'){
//         config.data = qs.stringify(config.data);
//     }
//     return config;
// });

// axios.interceptors.response.use((res) => {
//   return res;
// }, (error) => {
//   return Promise.reject(error);
// });

export default axios;
