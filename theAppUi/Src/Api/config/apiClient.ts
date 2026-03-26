import axios from 'axios';
import { setupInterceptors } from '../../Api/interceptors';
import { DEV_BASE_URL } from './endPoint';

const apiClient = axios.create({
  baseURL: DEV_BASE_URL,
  timeout: 10000,
});

setupInterceptors(apiClient);

export default apiClient;
