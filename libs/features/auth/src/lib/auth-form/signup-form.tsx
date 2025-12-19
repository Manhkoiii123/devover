'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { SignUpSchema } from '@common/validations/auth.validation';
import { useRegister } from '@common/api/endpoints/auth.api';
import { ROUTES } from '@common/constants/routes';
import AuthForm from './auth-form';

const SignUpForm = () => {
  const router = useRouter();

  const { mutate: register, isPending } = useRegister({
    onSuccess: (data) => {
      router.push(
        `${ROUTES.VERIFY_OTP}?email=${encodeURIComponent(data.email)}`
      );
    },
  });

  const handleSignUp = (values: z.infer<typeof SignUpSchema>) => {
    register(values);
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
      isPending={isPending}
    />
  );
};

export default SignUpForm;
