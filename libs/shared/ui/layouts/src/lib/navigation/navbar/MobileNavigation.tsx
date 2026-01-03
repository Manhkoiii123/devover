import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@common/ui/components/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@common/ui/components/sheet';

import { ROUTES } from '@common/constants/routes';
import NavLinks from './NavLinks';
import Hamburger from '@common/assets/icons/hamburger.svg';
import Logo from '@common/assets/images/site-logo.svg';

const MobileNavigation = async () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src={Hamburger}
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <Link href={ROUTES.HOME} className="flex items-center gap-1">
          <Image src={Logo} width={23} height={23} alt="Logo" />

          <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
            Dev<span className="text-primary-500">Overflow</span>
          </p>
        </Link>

        <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <section className="flex h-full flex-col gap-6 pt-16">
              <NavLinks isMobileNav />
            </section>
          </SheetClose>

          <div className="flex flex-col gap-3">
            <></>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
