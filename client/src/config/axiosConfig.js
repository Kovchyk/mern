import axios from 'axios';
import { STORAGE_NAME } from '@services/constants';

axios.defaults.headers.common['csrf-token'] = JSON.parse(localStorage.getItem(STORAGE_NAME))?.token;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json, text/javascript, */*; q=0.01';

axios.interceptors.response.use(
  response => (response && response.data ? response.data : response),
  // TODO: check the best approach
  error => Promise.reject(error),
);

// to avoid caching
axios.interceptors.request.use(req => {
  if (req.method.toLowerCase() !== 'get') {
    return req;
  }

  return {
    ...req,
    params: {
      ...req.params,
      _: Date.now(),
    },
  };
});

export function httpGet() {
  return axios.get.apply(this, arguments);
}

export function httpPut() {
  return axios.put.apply(this, arguments);
}

export function httpPost() {
  return axios.post.apply(this, arguments);
}

export function httpDelete() {
  return axios.delete.apply(this, arguments);
}
