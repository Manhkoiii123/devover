'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@common/ui/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@common/ui/components/form';
import { Input } from '@common/ui/components/input';
import SiteLogo from '@common/assets/images/site-logo.svg';
import { ROUTES } from '@common/constants/routes';
import {
  ForgotPasswordSchema,
  SetNewPasswordSchema,
  SignInSchema,
  SignUpSchema,
  VerifyOTPSchema,
} from '@common/validations/auth.validation';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@common/ui/components/input-otp';
import SocialAuthForm from '@common/auth/auth-form/social-auth-form';

type SignInValues = z.infer<typeof SignInSchema>;
type SignUpValues = z.infer<typeof SignUpSchema>;
type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>;
type SetNewPasswordValues = z.infer<typeof SetNewPasswordSchema>;
type VerifyOTPValues = z.infer<typeof VerifyOTPSchema>;

type AuthFormValues =
  | SignInValues
  | SignUpValues
  | ForgotPasswordValues
  | SetNewPasswordValues
  | VerifyOTPValues;

type AuthFieldName =
  | keyof SignInValues
  | keyof SignUpValues
  | keyof ForgotPasswordValues
  | keyof SetNewPasswordValues
  | keyof VerifyOTPValues;

type AuthFormProps =
  | {
      formType: 'SIGN_IN';
      schema: typeof SignInSchema;
      defaultValues: SignInValues;
      onSubmit: (values: SignInValues) => Promise<void> | void;
      isPending?: boolean;
      code?: string;
    }
  | {
      formType: 'SIGN_UP';
      schema: typeof SignUpSchema;
      defaultValues: SignUpValues;
      onSubmit: (values: SignUpValues) => Promise<void> | void;
      isPending?: boolean;
      code?: string;
    }
  | {
      formType: 'FORGOT_PASSWORD';
      schema: typeof ForgotPasswordSchema;
      defaultValues: ForgotPasswordValues;
      onSubmit: (values: ForgotPasswordValues) => Promise<void> | void;
      isPending?: boolean;
      code?: string;
    }
  | {
      formType: 'SET_NEW_PASSWORD';
      schema: typeof SetNewPasswordSchema;
      defaultValues: SetNewPasswordValues;
      onSubmit: (values: SetNewPasswordValues) => Promise<void> | void;
      isPending?: boolean;
      code?: string;
    }
  | {
      formType: 'VERIFY_OTP';
      schema: typeof VerifyOTPSchema;
      defaultValues: VerifyOTPValues;
      onSubmit: (values: VerifyOTPValues) => Promise<void> | void;
      isPending?: boolean;
      email?: string;
      onResend?: () => Promise<void> | void;
      isResending?: boolean;
      code?: string;
    };

const FORM_CONFIG = {
  SIGN_IN: {
    title: 'Sign In',
    subTitle: 'to continue to DevFlow',
    buttonText: 'Sign In',
    loadingText: 'Signing In...',
    linkText: "Don't have an account?",
    linkLabel: 'Sign up',
    linkHref: ROUTES.SIGN_UP,
  },
  SIGN_UP: {
    title: 'Create your account',
    subTitle: 'to continue to DevFlow',
    buttonText: 'Sign Up',
    loadingText: 'Signing Up...',
    linkText: 'Already have an account?',
    linkLabel: 'Sign in',
    linkHref: ROUTES.SIGN_IN,
  },
  FORGOT_PASSWORD: {
    title: 'Forgot Password',
    subTitle: 'No worries, we’ll send you reset instructions.',
    buttonText: 'Continue',
    loadingText: 'Sending Reset Link...',
    linkText: 'Back to ',
    linkLabel: 'login',
    linkHref: ROUTES.SIGN_IN,
  },
  SET_NEW_PASSWORD: {
    title: 'Set new password',
    subTitle: 'New password must be different.',
    buttonText: 'Reset password',
    loadingText: 'Resetting Password...',
    linkText: 'Back to ',
    linkLabel: 'login',
    linkHref: ROUTES.SIGN_IN,
  },
  VERIFY_OTP: {
    title: 'Verify OTP',
    subTitle: 'Enter the 6-digit code sent to your email',
    buttonText: 'Verify OTP',
    loadingText: 'Verifying...',
    linkText: 'Back to ',
    linkLabel: 'login',
    linkHref: ROUTES.SIGN_IN,
  },
} as const;

const FIELD_LABELS: Record<string, string> = {
  email: 'Email Address',
  password: 'Password',
  username: 'Username',
};

const AuthForm = (props: AuthFormProps) => {
  const { formType, schema, defaultValues, onSubmit, isPending } = props;
  const config = FORM_CONFIG[formType];

  const email = formType === 'VERIFY_OTP' ? props.email : undefined;
  const onResend = formType === 'VERIFY_OTP' ? props.onResend : undefined;
  const isResending = formType === 'VERIFY_OTP' ? props.isResending : undefined;

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as AuthFormValues,
  });

  const getFieldLabel = (fieldName: string) => {
    return (
      FIELD_LABELS[fieldName] ||
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    );
  };

  const handleSubmit = (values: AuthFormValues) => {
    if (formType === 'SIGN_IN') {
      (onSubmit as (values: SignInValues) => void)(values as SignInValues);
    } else if (formType === 'SIGN_UP') {
      (onSubmit as (values: SignUpValues) => void)(values as SignUpValues);
    } else if (formType === 'FORGOT_PASSWORD') {
      (onSubmit as (values: ForgotPasswordValues) => void)(
        values as ForgotPasswordValues
      );
    } else if (formType === 'VERIFY_OTP') {
      (onSubmit as (values: VerifyOTPValues) => void)(
        values as VerifyOTPValues
      );
    } else if (formType === 'SET_NEW_PASSWORD') {
      (onSubmit as (values: SetNewPasswordValues) => void)(
        values as SetNewPasswordValues
      );
    } else {
      (onSubmit as (values: SetNewPasswordValues) => void)(
        values as SetNewPasswordValues
      );
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <div className="space-y-2.5">
          <h1 className="h2-bold text-dark100_light900">{config.title}</h1>
          <p className="paragraph-regular text-dark500_light400">
            {formType === 'VERIFY_OTP' && email ? (
              <>
                Enter the 6-digit code sent to{' '}
                <span className="font-semibold">{email}</span>
              </>
            ) : (
              config.subTitle
            )}
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

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-10 space-y-6"
        >
          {formType === 'VERIFY_OTP' ? (
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-center gap-2.5">
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="background-light900_dark300 text-dark300_light700 size-12 text-lg"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            Object.keys(defaultValues)
              .filter((fieldName) => fieldName !== 'otp')
              .map((fieldName) => (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName as AuthFieldName}
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col gap-2.5">
                      <FormLabel className="paragraph-medium text-dark400_light700">
                        {getFieldLabel(fieldName)}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={
                            fieldName === 'password' ||
                            fieldName === 'confirmPassword'
                              ? 'password'
                              : 'text'
                          }
                          required
                          {...field}
                          className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))
          )}

          {formType === 'SIGN_IN' && (
            <Link href={ROUTES.FORGOT_PASSWORD}>
              <p className="text-right text-primary mb-4">Forgot password</p>
            </Link>
          )}

          <Button
            type="submit"
            disabled={form.formState.isSubmitting || isPending}
            className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter text-light-900"
          >
            {form.formState.isSubmitting
              ? config.loadingText
              : config.buttonText}
          </Button>

          {formType === 'VERIFY_OTP' && onResend && (
            <p className="flex items-center justify-center gap-1">
              Didn&apos;t receive the code?{' '}
              <button
                type="button"
                onClick={onResend}
                disabled={isResending}
                className="paragraph-semibold primary-text-gradient disabled:opacity-50"
              >
                {isResending ? 'Resending...' : 'Resend'}
              </button>
            </p>
          )}

          <p className="flex items-center justify-center gap-1">
            {config.linkText}{' '}
            <Link
              href={config.linkHref}
              className="paragraph-semibold primary-text-gradient"
            >
              {config.linkLabel}
            </Link>
          </p>

          {(formType === 'SIGN_IN' || formType === 'SIGN_UP') && (
            <SocialAuthForm />
          )}
        </form>
      </Form>
    </>
  );
};

export default AuthForm;
