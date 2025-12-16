'use client';

import { z } from 'zod';
import { SignInSchema } from '@common/validations/auth.validation';
import AuthForm from './auth-form';

const SignInForm = () => {
  const handleSignIn = async (values: z.infer<typeof SignInSchema>) => {
    console.log('Sign in:', values);
    // TODO: Implement sign in logic
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
    />
  );
};

export default SignInForm;
