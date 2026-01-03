'use client';
import Image from 'next/image';
import SiteLogo from '@common/assets/images/site-logo.svg';
import { Button } from '@common/ui/components/button';
import Link from 'next/link';
import { ROUTES } from '@common/constants/routes';
import { useSearchParams } from 'next/navigation';
import { useReSendLinkResetPassword } from '@common/api/endpoints/auth.api';
import { toast } from 'sonner';
const CheckEmailForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  if (!email) return null;
  const { mutate: reSend } = useReSendLinkResetPassword();
  const handleResend = () => {
    reSend(email, {
      onSuccess: () => {
        toast.success('Password reset link has been sent to your email.');
      },
    });
  };
  return (
    <>
      <div className="flex items-center flex-col justify-between gap-2">
        <div className="flex mb-4">
          <div className="space-y-2.5">
            <h1 className="h2-bold text-dark100_light900">Check your email</h1>
            <p className="paragraph-regular text-dark500_light400">
              We sent a password reset link to {email}
            </p>
          </div>
          <Image
            src={SiteLogo}
            alt="DevFlow Logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>
        <Button
          type="submit"
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter text-light-900"
          onClick={handleResend}
        >
          Resend
        </Button>
        <p className="flex items-center justify-center gap-1">
          Back to
          <Link
            href={ROUTES.SIGN_IN}
            className="paragraph-semibold primary-text-gradient"
          >
            login
          </Link>
        </p>
      </div>
    </>
  );
};

export default CheckEmailForm;
