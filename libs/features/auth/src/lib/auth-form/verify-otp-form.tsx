'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'sonner';
import { VerifyOTPSchema } from '@common/validations/auth.validation';
import { useVerifyOTP, useResendOTP } from '@common/api/endpoints/auth.api';
import { ROUTES } from '@common/constants/routes';
import AuthForm from './auth-form';
import { TYPE_VERIFYCATION_CODE } from '@common/types/auth/auth.type';

const VerifyOTPForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email') || '';

  const { mutate: verifyOTP, isPending } = useVerifyOTP({
    onSuccess: () => {
      toast.success('OTP verified successfully!');
      router.push(ROUTES.SIGN_IN);
    },
  });

  const { mutate: resendOTP, isPending: isResending } = useResendOTP({
    onSuccess: () => {
      toast.success('OTP has been resent to your email.');
    },
  });

  const handleSubmit = (values: z.infer<typeof VerifyOTPSchema>) => {
    verifyOTP({
      email,
      code: values.otp,
      type: TYPE_VERIFYCATION_CODE.EMAIL_CONFIRMATION,
    });
  };

  const handleResend = () => {
    resendOTP({ email });
  };

  return (
    <AuthForm
      schema={VerifyOTPSchema}
      defaultValues={{
        otp: '',
      }}
      formType="VERIFY_OTP"
      onSubmit={handleSubmit}
      isPending={isPending}
      email={email}
      onResend={handleResend}
      isResending={isResending}
    />
  );
};

export default VerifyOTPForm;
