import { ApiResponse } from '../response.type';

export enum TYPE_VERIFYCATION_CODE {
  EMAIL_CONFIRMATION = 'EMAIL_CONFIRMATION',
  PASSWORD_RESET = 'PASSWORD_RESET',
}

export enum USER_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface VerifyOTPRequest {
  email: string;
  code: string;
  type: TYPE_VERIFYCATION_CODE;
}

export interface ResendOTPRequest {
  email: string;
  type: TYPE_VERIFYCATION_CODE;
}

export interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface AuthUser extends BaseEntity {
  username: string;
  email: string;
  phoneNumber: string;
  avatar?: string | null;
  status: USER_STATUS;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginData extends AuthTokens {}

export interface RegisterData extends AuthUser {}

export interface RefreshTokenData {
  accessToken: string;
}

export interface VerifyOTPData {
  message: string;
}

export interface ResendOTPData {
  message: string;
}

// Response types (kế thừa từ ApiResponse)
export type LoginResponse = ApiResponse<LoginData>;
export type RegisterResponse = ApiResponse<RegisterData>;
export type RefreshTokenResponse = ApiResponse<RefreshTokenData>;
export type VerifyOTPResponse = ApiResponse<VerifyOTPData>;
export type ResendOTPResponse = ApiResponse<ResendOTPData>;
