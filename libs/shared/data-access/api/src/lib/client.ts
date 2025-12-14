import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { setupInterceptors } from './interceptors';

const baseConfig: AxiosRequestConfig = {
  baseURL: process.env['NEXT_PUBLIC_API_URL'] || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const createApiClient = (): AxiosInstance => {
  const instance = axios.create(baseConfig);
  setupInterceptors(instance);
  return instance;
};

export const apiClient = createApiClient();
