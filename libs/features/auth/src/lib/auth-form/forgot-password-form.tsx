'use client';

import { z } from 'zod';
import { ForgotPasswordSchema } from '@common/validations/auth.validation';
import AuthForm from './auth-form';

const ForgotPasswordForm = () => {
  const handleForgotPassword = async (
    values: z.infer<typeof ForgotPasswordSchema>
  ) => {
    console.log('Forgot password:', values);
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
