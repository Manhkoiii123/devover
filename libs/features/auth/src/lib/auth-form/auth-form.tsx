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
  SignInSchema,
  SignUpSchema,
} from '@common/validations/auth.validation';

type SignInValues = z.infer<typeof SignInSchema>;
type SignUpValues = z.infer<typeof SignUpSchema>;

type AuthFieldName = keyof SignInValues | keyof SignUpValues;

type AuthFormProps =
  | {
      formType: 'SIGN_IN';
      schema: typeof SignInSchema;
      defaultValues: SignInValues;
      onSubmit: (values: SignInValues) => Promise<void> | void;
    }
  | {
      formType: 'SIGN_UP';
      schema: typeof SignUpSchema;
      defaultValues: SignUpValues;
      onSubmit: (values: SignUpValues) => Promise<void> | void;
    };

const FORM_CONFIG = {
  SIGN_IN: {
    title: 'Sign In',
    buttonText: 'Sign In',
    loadingText: 'Signing In...',
    linkText: "Don't have an account?",
    linkLabel: 'Sign up',
    linkHref: ROUTES.SIGN_UP,
  },
  SIGN_UP: {
    title: 'Create your account',
    buttonText: 'Sign Up',
    loadingText: 'Signing Up...',
    linkText: 'Already have an account?',
    linkLabel: 'Sign in',
    linkHref: ROUTES.SIGN_IN,
  },
} as const;

const FIELD_LABELS: Record<string, string> = {
  email: 'Email Address',
  password: 'Password',
  username: 'Username',
};

const AuthForm = (props: AuthFormProps) => {
  const { formType, schema, defaultValues, onSubmit } = props;
  const config = FORM_CONFIG[formType];

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const getFieldLabel = (fieldName: string) => {
    return (
      FIELD_LABELS[fieldName] ||
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    );
  };

  const handleSubmit = (values: SignInValues | SignUpValues) => {
    if (formType === 'SIGN_IN') {
      (onSubmit as (values: SignInValues) => void)(values as SignInValues);
    } else {
      (onSubmit as (values: SignUpValues) => void)(values as SignUpValues);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <div className="space-y-2.5">
          <h1 className="h2-bold text-dark100_light900">{config.title}</h1>
          <p className="paragraph-regular text-dark500_light400">
            to continue to DevFlow
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
          {Object.keys(defaultValues).map((fieldName) => (
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
          ))}

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter text-light-900"
          >
            {form.formState.isSubmitting
              ? config.loadingText
              : config.buttonText}
          </Button>

          <p className="flex items-center justify-center gap-1">
            {config.linkText}{' '}
            <Link
              href={config.linkHref}
              className="paragraph-semibold primary-text-gradient"
            >
              {config.linkLabel}
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
};

export default AuthForm;
