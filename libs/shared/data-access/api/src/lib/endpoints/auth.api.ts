import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import {
  LoginRequest,
  LoginData,
  RegisterRequest,
  RefreshTokenData,
  VerifyOTPRequest,
  VerifyOTPData,
  ResendOTPRequest,
  ResendOTPData,
  RegisterData,
  GoogleCallbackRequest,
  GoogleCallbackData,
  ResetPasswordRequest,
  AuthUser,
} from '@common/types/auth/auth.type';
import { apiClient } from '../client';
import Cookies from 'js-cookie';

export const AUTH_QUERY_KEYS = {
  currentUser: ['currentUser'] as const,
};

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<LoginData>('/auth/login', data).then((res) => res.data),

  register: (data: RegisterRequest) =>
    apiClient
      .post<RegisterData>('/auth/register', data)
      .then((res) => res.data),

  logout: (data: { refreshToken: string }) =>
    apiClient.post('/auth/logout', data).then((res) => res.data),

  refreshToken: (refreshToken: string) =>
    apiClient
      .post<RefreshTokenData>('/auth/refresh', { refreshToken })
      .then((res) => res.data),

  sendLinkResetPassword: (email: string) =>
    apiClient.post('/auth/send-link-reset-password', { email }),

  verifyOTP: (data: VerifyOTPRequest) =>
    apiClient
      .post<VerifyOTPData>('/auth/validate-otp', data)
      .then((res) => res.data),

  resendOTP: (data: ResendOTPRequest) =>
    apiClient
      .post<ResendOTPData>('/auth/re-send-otp', data)
      .then((res) => res.data),

  getGoogleAuthUrl: () =>
    apiClient
      .get<string>('/auth/google/authorization-url')
      .then((res) => res.data),

  googleCallback: (data: GoogleCallbackRequest) =>
    apiClient
      .get<GoogleCallbackData>('/auth/google/callback', { params: data })
      .then((res) => res.data),
  resetPassword: (data: ResetPasswordRequest) =>
    apiClient.post('/auth/reset-password', data),
  reSendLinkResetPassword: (email: string) =>
    apiClient.post('/auth/re-send-link-forgot-password', { email }),

  getMe: () => apiClient.get<AuthUser>('/auth/me').then((res) => res.data),
};

export const useLogin = (
  options?: UseMutationOptions<LoginData, Error, LoginRequest>
) => {
  return useMutation({
    mutationFn: authApi.login,
    ...options,
  });
};

export const useRegister = (
  options?: UseMutationOptions<RegisterData, Error, RegisterRequest>
) => {
  return useMutation({
    mutationFn: authApi.register,
    ...options,
  });
};

export const useLogout = (options?: UseMutationOptions<void, Error, void>) => {
  return useMutation({
    mutationFn: () =>
      authApi.logout({ refreshToken: Cookies.get('refreshToken') || '' }),
    onSuccess: () => {
      Cookies.remove('refreshToken');
      Cookies.remove('accessToken');
    },
    ...options,
  });
};

export const useRefreshToken = (
  options?: UseMutationOptions<RefreshTokenData, Error, string>
) => {
  return useMutation({
    mutationFn: authApi.refreshToken,
    ...options,
  });
};

export const useVerifyOTP = (
  options?: UseMutationOptions<VerifyOTPData, Error, VerifyOTPRequest>
) => {
  return useMutation({
    mutationFn: authApi.verifyOTP,
    ...options,
  });
};

export const useResendOTP = (
  options?: UseMutationOptions<ResendOTPData, Error, ResendOTPRequest>
) => {
  return useMutation({
    mutationFn: authApi.resendOTP,
    ...options,
  });
};

export const useGoogleAuthUrl = () => {
  return useMutation({
    mutationFn: authApi.getGoogleAuthUrl,
  });
};

export const useGoogleCallback = (
  options?: UseMutationOptions<GoogleCallbackData, Error, GoogleCallbackRequest>
) => {
  return useMutation({
    mutationFn: authApi.googleCallback,
    ...options,
  });
};

export const useSendLinkResetPassword = () => {
  return useMutation({
    mutationFn: authApi.sendLinkResetPassword,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: authApi.resetPassword,
  });
};

export const useReSendLinkResetPassword = () => {
  return useMutation({
    mutationFn: authApi.reSendLinkResetPassword,
  });
};

export const useCurrentUser = (
  options?: Omit<UseQueryOptions<AuthUser, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.currentUser,
    queryFn: authApi.getMe,
    staleTime: 5 * 60 * 1000,
    retry: false,
    ...options,
  });
};
