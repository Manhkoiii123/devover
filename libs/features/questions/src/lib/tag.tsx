import { ROUTES } from '@common/constants/routes';
import Link from 'next/link';
import React from 'react';
import { Badge } from '@common/ui/components/badge';
import { cn } from '@common/utils/cn.utils';
import Image from 'next/image';
import Close from '@common/assets/icons/close.svg';

interface Props {
  id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compack?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const Tag = ({
  id,
  name,
  questions,
  showCount,
  compack,
  remove,
  isButton,
  handleRemove,
}: Props) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const Content = (
    <>
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2">
          <span>{name}</span>
        </div>

        {remove && (
          <Image
            src={Close}
            width={12}
            height={12}
            alt="close"
            className="cursor-pointer object-contain invert-0 dark:invert"
            onClick={handleRemove}
          />
        )}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
    </>
  );

  if (compack) {
    return isButton ? (
      <button onClick={handleClick} className="flex justify-between gap-2">
        {Content}
      </button>
    ) : (
      <Link href={'/'} className="flex justify-between gap-2">
        {Content}
      </Link>
    );
  }

  return (
    <Link href={'/'} className="shadow-light100_darknone">
      <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[250px]">
        <div className="flex items-center justify-between gap-3">
          <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
            <p className="paragraph-semibold text-dark300_light900">{name}</p>
          </div>
        </div>

        <p className="small-regular text-dark500_light700 mt-5 line-clamp-3 w-full">
          {/* {iconDescription} */}
        </p>

        <p className="small-medium text-dark400_light500 mt-4">
          <span className="body-semibold primary-text-gradient mr-2.5">
            {questions}+
          </span>
          Questions
        </p>
      </article>
    </Link>
  );
};

export default Tag;
