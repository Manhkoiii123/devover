'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { ROUTES } from '@common/constants/routes';

const GoogleCallbackPage = () => {
  const router = useRouter();
  const hasProcessedRef = useRef(false);

  useEffect(() => {
    if (hasProcessedRef.current) return;
    hasProcessedRef.current = true;

    // Get tokens from URL query params
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');
    const error = params.get('error');

    if (error) {
      console.error('Google login failed:', error);
      router.push(`${ROUTES.SIGN_IN}?error=${error}`);
      return;
    }

    if (accessToken && refreshToken) {
      Cookies.set('accessToken', accessToken, {
        expires: 7,
        secure: process.env['NODE_ENV'] === 'production',
        sameSite: 'strict',
      });

      Cookies.set('refreshToken', refreshToken, {
        expires: 30,
        secure: process.env['NODE_ENV'] === 'production',
        sameSite: 'strict',
      });

      router.push(ROUTES.HOME);
    } else {
      router.push(ROUTES.SIGN_IN);
    }
  }, [router]);

  return <></>;
};

export default GoogleCallbackPage;
