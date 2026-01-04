'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@common/utils/cn.utils';
import { formUrlQuery } from '@common/utils/query.utils';

interface Filter {
  name: string;
  value: string;
}

interface Props {
  filters: Filter[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({
  filters,
  otherClasses = '',
  containerClasses = '',
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramsFilter = searchParams.get('filter');

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'filter',
      value,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={cn('flex flex-wrap gap-3', containerClasses)}>
      {filters.map((item) => {
        const isActive =
          paramsFilter === item.value ||
          (paramsFilter === null && item.value === 'newest');
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => handleUpdateParams(item.value)}
            className={cn(
              'rounded-lg px-6 py-2.5 text-lg font-medium capitalize transition-colors',
              'background-light800_dark300 light-border border',
              isActive
                ? 'text-primary-500'
                : 'text-dark500_light700 hover:bg-light-700 dark:hover:bg-dark-400',
              otherClasses
            )}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
};

export default Filter;
