import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ROUTES } from '@common/constants/routes';
import {
  RefreshTokenData,
  RefreshTokenResponse,
} from '@common/types/auth/auth.type';
import { apiClient } from '@common/api/client';

const isClient = typeof document !== 'undefined';

const getCookie = (name: string): string | undefined => {
  if (!isClient) return undefined;
  return Cookies.get(name);
};

const setCookie = (
  name: string,
  value: string,
  options?: Cookies.CookieAttributes
): void => {
  if (!isClient) return;
  Cookies.set(name, value, options);
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

const clearAuthAndRedirect = (): void => {
  removeCookie('accessToken');
  removeCookie('refreshToken');
  redirectTo(ROUTES.SIGN_IN);
};

// Promise để đảm bảo chỉ gọi refresh token 1 lần tại 1 thời điểm
let refreshTokenPromise: Promise<string> | null = null;

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

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
    (response) => {
      if (response.data && 'data' in response.data) {
        response.data = response.data.data;
      }
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      if (!originalRequest || !isClient) {
        return Promise.reject(error);
      }

      const status = error.response?.status;
      const shouldRefresh =
        (status === 401 || status === 410) && !originalRequest._retry;

      if (shouldRefresh) {
        originalRequest._retry = true;

        const refreshToken = getCookie('refreshToken');

        if (!refreshToken) {
          clearAuthAndRedirect();
          return Promise.reject(error);
        }

        if (!refreshTokenPromise) {
          refreshTokenPromise = apiClient
            .post<RefreshTokenData>('/auth/refresh', { refreshToken })
            .then((res) => res.data)
            .then((res) => {
              const newAccessToken = res.accessToken;

              setCookie('accessToken', newAccessToken, {
                expires: 7,
                secure: process.env['NODE_ENV'] === 'production',
                sameSite: 'strict',
              });

              instance.defaults.headers.common[
                'Authorization'
              ] = `Bearer ${newAccessToken}`;

              return newAccessToken;
            })
            .catch((refreshError) => {
              clearAuthAndRedirect();
              return Promise.reject(refreshError);
            })
            .finally(() => {
              refreshTokenPromise = null;
            });
        }

        return refreshTokenPromise.then((newAccessToken) => {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        });
      }

      return Promise.reject(error);
    }
  );
};
