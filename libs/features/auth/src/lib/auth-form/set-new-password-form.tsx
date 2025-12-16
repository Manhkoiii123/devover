'use client';

import { z } from 'zod';
import { SetNewPasswordSchema } from '@common/validations/auth.validation';
import AuthForm from './auth-form';

const SetNewPasswordForm = () => {
  const handleSetNewPassword = async (
    values: z.infer<typeof SetNewPasswordSchema>
  ) => {
    console.log('Sign in:', values);
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
    />
  );
};

export default SetNewPasswordForm;
