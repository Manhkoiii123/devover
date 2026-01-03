import Image from 'next/image';
import Link from 'next/link';
import Theme from './Theme';
import Logo from '@common/assets/images/site-logo.svg';
import MobileNavigation from './MobileNavigation';
import { ROUTES } from '@common/constants/routes';

const Navbar = async () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href={ROUTES.HOME} className="flex items-center gap-1">
        <Image src={Logo} width={40} height={40} alt="EasyDevFlow Logo" />
        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev<span className="text-primary-500">Overflow</span>
        </p>
      </Link>

      <div className="flex-between gap-5">
        <Theme />
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
