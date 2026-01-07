export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  VERIFY_OTP: '/verify-otp',
  FORGOT_PASSWORD: '/forgot-password',
  SET_NEW_PASSWORD: '/reset-password',
  CHECK_EMAIL: '/check-email',
  ASK_QUESTION: '/ask-question',
  TAGS: '/tags',
  COLLECTION: '/collection',
  PROFILE: (id: string) => `/profile/${id}`,
  QUESTION: (id: string) => `/question/${id}`,
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RouteValue = (typeof ROUTES)[RouteKey];
