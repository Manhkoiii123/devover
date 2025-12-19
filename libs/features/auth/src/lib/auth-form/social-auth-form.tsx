'use client';

import { Button } from '@common/ui/components/button';
import Image from 'next/image';
import GithubLogo from '@common/assets/icons/github.svg';
import GoogleLogo from '@common/assets/icons/google.svg';

const SocialAuthForm = () => {
  return (
    <div className="mt-5 flex flex-wrap gap-2.5">
      <Button className="background-light850_dark100! body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5">
        <Image
          src={GithubLogo}
          alt="Github Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Log in with GitHub</span>
      </Button>

      <Button className="background-light850_dark100! body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5">
        <Image
          src={GoogleLogo}
          alt="Google Logo"
          width={20}
          height={20}
          className="mr-2.5 object-contain"
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
