'use client';

import { z } from 'zod';
import { SetNewPasswordSchema } from '@common/validations/auth.validation';
import AuthForm from './auth-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useResetPassword } from '@common/api/endpoints/auth.api';
import { ROUTES } from '@common/constants/routes';

const SetNewPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const email = searchParams.get('email');
  if (!email || !code) return null;
  const { mutate: resetPassword } = useResetPassword();
  const handleSetNewPassword = async (
    values: z.infer<typeof SetNewPasswordSchema>
  ) => {
    const data = {
      email,
      code,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    resetPassword(data, {
      onSuccess: () => {
        router.push(ROUTES.SIGN_IN);
      },
    });
  };

  return (
    <AuthForm
      schema={SetNewPasswordSchema}
      defaultValues={{
        password: '',
        confirmPassword: '',
      }}
      formType="SET_NEW_PASSWORD"
      onSubmit={handleSetNewPassword}
      code={code}
    />
  );
};

export default SetNewPasswordForm;
