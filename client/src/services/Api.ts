import axios from 'axios';
import { setJwtToken, removeJwtToken, getJwtToken } from './Jwt';

const api = axios.create({
  baseURL: '/',
  timeout: 30000,
});

function errorResponseHandler(error: any) {
  // check for errorHandle config
  if (
    error.config.hasOwnProperty('errorHandle') &&
    error.config.errorHandle === false
  ) {
    return Promise.reject(error);
  }

  // if has response show the error
  let errorMessage = 'There was an error';
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.error &&
    error.response.data.error.message
  ) {
    errorMessage = error.response.data.error.message;
  } else if (error.message) {
    errorMessage = error.message;
  }
  if (
    errorMessage === 'jwt malformed' ||
    errorMessage === 'jwt expired' ||
    errorMessage === 'me user not found'
  ) {
    removeJwtToken();
    window.location.href = '/login';
  }
  const err = new Error(errorMessage);
  console.error(err);
  return Promise.reject(err);
}

// apply interceptor on response
api.interceptors.response.use((response) => response, errorResponseHandler);

const checkJwtToken = (headers: any) => {
  if (headers.jwt_token) {
    setJwtToken(headers.jwt_token);
  }
};

const addHeaders = (headers = {}) => {
  const token = getJwtToken();
  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return headers;
};

const Api = {
  async get(url: string, params = {}, headers = {}) {
    headers = addHeaders(headers);
    const response = await api.get(url, {
      headers,
      params,
    });
    checkJwtToken(response.headers);
    return response.data;
  },
  async post(url: string, params = {}, headers = {}) {
    headers = addHeaders(headers);
    const response = await api.post(url, params, {
      headers,
    });
    checkJwtToken(response.headers);
    return response.data;
  },
  async postFile(
    url: string,
    params = {},
    onUploadProgress = () => {},
    headers = {}
  ) {
    headers = addHeaders(headers);
    const response = await api.post(url, params, {
      headers,
      onUploadProgress,
    });
    checkJwtToken(response.headers);
    return response.data;
  },
  async put(url: string, params = {}, headers = {}) {
    headers = addHeaders(headers);
    const response = await api.put(url, params, {
      headers,
    });
    checkJwtToken(response.headers);
    return response.data;
  },
  async patch(url: string, params = {}, headers = {}) {
    headers = addHeaders(headers);
    const response = await api.patch(url, params, {
      headers,
    });
    checkJwtToken(response.headers);
    return response.data;
  },
  async delete(url: string, headers = {}) {
    headers = addHeaders(headers);
    const response = await api.delete(url, {
      headers,
    });
    checkJwtToken(response.headers);
    return response.data;
  },
};

export default Api;
