'use client';
import { useAuth } from '@common/providers/auth-provider';
import NavLinks from '../navbar/NavLinks';
import { Button } from '@common/ui/components/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@common/constants/routes';
import Image from 'next/image';
import Account from '@common/assets/icons/account.svg';
import SignUp from '@common/assets/icons/sign-up.svg';
import { useLogout } from '@common/api/endpoints';
import { toast } from 'sonner';

const LeftSidebar = () => {
  const { user } = useAuth();

  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();

    toast.success('Logout successful');
  };

  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 h-screen flex flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        <NavLinks />
      </div>

      <div className="flex flex-col gap-3">
        {user?.id ? (
          <Button
            onClick={handleLogout}
            className="small-medium bg-light-700 dark:bg-dark-300 hover:bg-light-700/80 dark:hover:bg-dark-300/80 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
          >
            <LogOut className="size-5 text-black dark:text-white" />
            <span className="text-dark300_light900 max-lg:hidden">Logout</span>
          </Button>
        ) : (
          <>
            <Button className="small-medium bg-light-700 dark:bg-dark-300 hover:bg-light-700/80 dark:hover:bg-dark-300/80 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Link href={ROUTES.SIGN_IN}>
                <Image
                  src={Account}
                  alt="Account"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="primary-text-gradient max-lg:hidden">
                  Sign In
                </span>
              </Link>
            </Button>

            <Button className="small-medium light-border-2 bg-light-700 dark:bg-dark-300 hover:bg-light-700/80 dark:hover:bg-dark-300/80 text-dark400_light900 min-h-[41px] w-full border rounded-lg px-4 py-3 shadow-none">
              <Link href={ROUTES.SIGN_UP}>
                <Image
                  src={SignUp}
                  alt="Account"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="max-lg:hidden">Sign Up</span>
              </Link>
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default LeftSidebar;
