'use client';

import { z } from 'zod';
import { SignUpSchema } from '@common/validations/auth.validation';
import AuthForm from './auth-form';

const SignUpForm = () => {
  const handleSignUp = async (values: z.infer<typeof SignUpSchema>) => {
    console.log('Sign up:', values);
  };

  return (
    <AuthForm
      schema={SignUpSchema}
      defaultValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      formType="SIGN_UP"
      onSubmit={handleSignUp}
    />
  );
};

export default SignUpForm;
