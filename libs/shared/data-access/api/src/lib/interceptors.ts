import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const isClient = typeof document !== 'undefined';

const getCookie = (name: string): string | undefined => {
  if (!isClient) return undefined;
  return Cookies.get(name);
};

const removeCookie = (name: string): void => {
  if (!isClient) return;
  Cookies.remove(name);
};

const redirectTo = (path: string): void => {
  if (isClient) {
    window.location.href = path;
  }
};

export const setupInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getCookie('accessToken');

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && originalRequest) {
        removeCookie('accessToken');
        redirectTo('/login');
      }

      return Promise.reject(error);
    }
  );
};
