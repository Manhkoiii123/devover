import Image from 'next/image';
import { ReactNode } from 'react';

import authDark from '@common/assets/images/auth-dark.png';
import authLight from '@common/assets/images/auth-light.png';
const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-10">
      {/* Light mode background */}
      <Image
        src={authLight}
        alt=""
        fill
        className="object-cover dark:hidden"
        priority
      />
      {/* Dark mode background */}
      <Image
        src={authDark}
        alt=""
        fill
        className="hidden object-cover dark:block"
        priority
      />
      <section className="relative z-10 light-border background-light800_dark200 shadow-light100_dark100 min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8">
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
