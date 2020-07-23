import axios from 'axios';
import url from './url';

const instance = axios.create({
  baseURL: url.apiUrl,
  timeout: 30000,
});

export default instance;
