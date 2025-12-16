'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { SignUpSchema } from '@common/validations/auth.validation';
import Image from 'next/image';
import SiteLogo from '@common/assets/images/site-logo.svg';
import { ROUTES } from '@common/constants/routes';
import Link from 'next/link';

const SignUpForm = () => {
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  function onSubmit(values: z.infer<typeof SignUpSchema>) {
    console.log(values);
  }
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <div className="space-y-2.5">
          <h1 className="h2-bold text-dark100_light900">Create your account</h1>
          <p className="paragraph-regular text-dark500_light400">
            to continue to DevFlow
          </p>
        </div>
        <Image
          src={SiteLogo}
          alt="EasyDevFlow Logo"
          width={50}
          height={50}
          className="object-contain"
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 space-y-6"
        >
          {Object.keys({
            email: '',
            password: '',
          }).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as keyof z.infer<typeof SignUpSchema>}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-2.5">
                  <FormLabel className="paragraph-medium text-dark400_light700">
                    {field.name === 'email'
                      ? 'Email Address'
                      : field.name.charAt(0).toUpperCase() +
                        field.name.slice(1)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      type={field.name === 'password' ? 'password' : 'text'}
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
            disabled={form.formState.isSubmitting}
            className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
          >
            {form.formState.isSubmitting ? 'Signing up...' : 'Continue'}
          </Button>

          <div className="flex items-center justify-center">
            <p>
              Already have an account?{' '}
              <Link
                href={ROUTES.SIGN_IN}
                className="paragraph-semibold primary-text-gradient"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SignUpForm;
