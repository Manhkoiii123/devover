import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../button';
import { DEFAULT_EMPTY, DEFAULT_ERROR } from '@common/constants/empty';
import LightError from '@common/assets/images/light-error.png';
import DarkError from '@common/assets/images/dark-error.png';

interface Props<T> {
  success: boolean;
  error?: Error | null;
  data: T[] | null | undefined;
  empty: {
    title: string;
    message: string;
    button?: {
      text: string;
      href: string;
    };
  };
  render: (data: T[]) => React.ReactNode;
}

interface StateSkeletonProps {
  image: {
    light: string;
    dark: string;
    alt: string;
  };
  title: string;
  message: string;
  button?: {
    text: string;
    href: string;
  };
}

const StateSkeleton = ({
  image,
  title,
  message,
  button,
}: StateSkeletonProps) => (
  <div className="mt-16 flex w-full flex-col items-center justify-center sm:mt-36">
    <>
      <Image
        src={image.dark}
        alt={image.alt}
        width={270}
        height={200}
        className="hidden object-contain dark:block"
      />
      <Image
        src={image.light}
        alt={image.alt}
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
    </>
    <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
    <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
      {message}
    </p>

    {button && (
      <Link href={button.href}>
        <Button className="paragraph-medium min-h-[45px] rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500">
          {button.text}
        </Button>
      </Link>
    )}
  </div>
);

const DataRenderer = <T,>({
  success,
  error,
  data,
  empty = DEFAULT_EMPTY,
  render,
}: Props<T>) => {
  if (!success) {
    return (
      <StateSkeleton
        image={{
          light: LightError,
          dark: DarkError,
          alt: 'Error state illustration',
        }}
        title={error?.message || DEFAULT_ERROR.title}
        message={
          error?.message || 'Something went wrong. Please try again later.'
        }
        button={DEFAULT_ERROR.button}
      />
    );
  }

  if (!data || data.length === 0)
    return (
      <StateSkeleton
        image={{
          light: '/images/light-illustration.png',
          dark: '/images/dark-illustration.png',
          alt: 'Error state illustration',
        }}
        title={empty.title}
        message={empty.message}
        button={empty.button}
      />
    );
  return <div>{render(data)}</div>;
};

export default DataRenderer;
