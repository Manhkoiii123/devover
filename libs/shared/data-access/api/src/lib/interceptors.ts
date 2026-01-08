import axios, {
  type AxiosInstance,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';
import { ROUTES } from '@common/constants/routes';
import { RefreshTokenData } from '@common/types/auth/auth.type';

// Separate axios instance for refresh token calls (no interceptors to avoid circular dependency)
const refreshClient = axios.create({
  baseURL: process.env['NEXT_PUBLIC_API_URL'] || 'http://localhost:3300/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

let isLoggingOut = false;

const clearAuthAndRedirect = (): void => {
  if (isLoggingOut) return;
  isLoggingOut = true;

  removeCookie('accessToken');
  removeCookie('refreshToken');

  setTimeout(() => {
    isLoggingOut = false;
    redirectTo(ROUTES.SIGN_IN);
  }, 100);
};

export const resetLogoutState = (): void => {
  isLoggingOut = false;
};

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

      if (isLoggingOut) {
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
          refreshTokenPromise = refreshClient
            .post<{ data: RefreshTokenData }>('/auth/refresh-token', {
              refreshToken,
            })
            .then((res) => {
              // Handle raw response (not transformed by interceptors)
              const responseData = res.data?.data || res.data;
              const newAccessToken = (responseData as RefreshTokenData)
                .accessToken;

              if (!newAccessToken) {
                throw new Error('No access token received from refresh');
              }

              setCookie('accessToken', newAccessToken, {
                expires: 7,
                path: '/',
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
              throw refreshError;
            })
            .finally(() => {
              refreshTokenPromise = null;
            });
        }

        return refreshTokenPromise
          .then((newAccessToken) => {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          })
          .catch(() => {
            // If refresh failed, reject with original error
            return Promise.reject(error);
          });
      }

      return Promise.reject(error);
    }
  );
};
