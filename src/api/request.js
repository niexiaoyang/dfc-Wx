import axios from 'axios';
import https from 'https';
import Cookies from 'js-cookie';
import querystring from 'querystring';

// api root
export const API_VERSION = '2.0';
export const apiRoot = `/apis/dfcapi/api/${API_VERSION}`;

const newRquest = axios.create({
  baseURL: apiRoot,
  httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: false }),
  transformRequest(params) {
    const req = {
      data: JSON.stringify(params),
    };

    const token = Cookies.get('token');
    if (token) {
      req.token = token;
    }

    return querystring.stringify(req);
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
    const { status, msg } = res;

    if (status !== 0) {
      console.log('msg', msg);
    }

    return res;
  },
  error => Promise.reject(error),
);

newRquest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default newRquest;
