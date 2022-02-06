import axios from 'axios';

const request = async (url, method = 'GET', body = null, headers = {}) => {
  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const data = await axios({ method, url, data: body }, { headers });

    return data;
  } catch (e) {
    throw e;
  }
};

export { request };
