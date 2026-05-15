import axios from 'axios';
import { baseURL, STORAGE_KEY } from '../../constants/api/api.constant';
import { LOCALE_KEY } from '@/lib/constants/locale/locale.constant';

export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEY);

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    config.headers['accept-language'] =
      localStorage.getItem(LOCALE_KEY) || 'en';
    return config;
  },
  (error) => Promise.reject(error),
);
