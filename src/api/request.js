import axios from 'axios';
import https from 'https';
import querystring from 'querystring';
import router from '@/router';

// api root
export const apiRoot = '/apis';

const newRquest = axios.create({
  baseURL: apiRoot,
  httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: false }),
  transformRequest(params) {
    return querystring.stringify({ data: JSON.stringify(params) });
  },
});

// request interceptor
newRquest.interceptors.request.use(
  (config) => {
    // access token
    const { method } = config;
    // const token = getToken();

    if (method === 'get') {
      config.params = {
        ...config.params,
      };
    } else {
      config.data = {
        ...config.data,
      };
    }

    return config;
  },
  (error) => {
    // Do something with request error
    Promise.reject(error);
  },
);

// respone interceptor
newRquest.interceptors.response.use(
  (response) => {
    const res = response.data;
    const { msg, status } = res;

    return res;
  },
  error => Promise.reject(error),
);

newRquest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default newRquest;
