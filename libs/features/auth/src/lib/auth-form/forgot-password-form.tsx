'use client';

import { z } from 'zod';
import { ForgotPasswordSchema } from '@common/validations/auth.validation';
import AuthForm from './auth-form';
import { useSendLinkResetPassword } from '@common/api/endpoints/auth.api';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@common/constants/routes';

const ForgotPasswordForm = () => {
  const router = useRouter();
  const { mutate: sendLinkResetPassword, isSuccess } =
    useSendLinkResetPassword();
  const handleForgotPassword = async (
    values: z.infer<typeof ForgotPasswordSchema>
  ) => {
    sendLinkResetPassword(values.email, {
      onSuccess: () => {
        router.push(`${ROUTES.CHECK_EMAIL}?email=${values.email}`);
      },
    });
  };

  return (
    <AuthForm
      schema={ForgotPasswordSchema}
      defaultValues={{
        email: '',
      }}
      formType="FORGOT_PASSWORD"
      onSubmit={handleForgotPassword}
    />
  );
};

export default ForgotPasswordForm;
