'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import Cookies from 'js-cookie';
import { SignInSchema } from '@common/validations/auth.validation';
import { useLogin } from '@common/api/endpoints/auth.api';
import { ROUTES } from '@common/constants/routes';
import AuthForm from './auth-form';

const SignInForm = () => {
  const router = useRouter();

  const { mutate: login, isPending } = useLogin({
    onSuccess: (data) => {
      Cookies.set('accessToken', data.accessToken, {
        expires: 7,
        path: '/',
        secure: process.env['NODE_ENV'] === 'production',
        sameSite: 'strict',
      });

      Cookies.set('refreshToken', data.refreshToken, {
        expires: 30,
        path: '/',
        secure: process.env['NODE_ENV'] === 'production',
        sameSite: 'strict',
      });

      router.push(ROUTES.HOME);
    },
  });

  const handleSignIn = (values: z.infer<typeof SignInSchema>) => {
    login(values);
  };

  return (
    <AuthForm
      schema={SignInSchema}
      defaultValues={{
        email: '',
        password: '',
      }}
      formType="SIGN_IN"
      onSubmit={handleSignIn}
      isPending={isPending}
    />
  );
};

export default SignInForm;
