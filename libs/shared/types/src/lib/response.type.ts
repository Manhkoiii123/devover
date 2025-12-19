export interface ApiResponse<T = unknown> {
  code: string;
  data?: T;
  error?: string;
  statusCode: number;
}

export type ApiSuccessResponse<T> = ApiResponse<T> & {
  data: T;
  error?: never;
};

export type ApiErrorResponse = ApiResponse<never> & {
  data?: never;
  error: string;
};
