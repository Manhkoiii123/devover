import { ROUTES } from '@common/constants/routes';
import { getTimeStamp } from '@common/utils/date.utils';
import Link from 'next/link';
import React from 'react';
import TagCard from './tag-card';
import Metric from './metric';
import { QuestionResponse, Tag } from '@common/types/question/question.type';
import Like from '@common/assets/icons/like.svg';
import Message from '@common/assets/icons/message.svg';
import Eye from '@common/assets/icons/eye.svg';
import User from '@common/assets/icons/user.svg';

interface Props {
  question: QuestionResponse;
}

const QuestionCard = ({
  question: {
    id,
    title,
    tags,
    author,
    upvotes,
    answersCount,
    viewsCount,
    createdAt,
  },
}: Props) => {
  return (
    <div className="bg-light-900 dark:dark-gradient shadow-light-100 dark:shadow-dark-100 rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(new Date(createdAt))}
          </span>
          <Link href={'/'}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>

      <div className="mt-3.5 flex w-full flex-wrap gap-2">
        {tags.map((tag: Tag) => (
          <TagCard key={tag.id} id={tag.id} name={tag.name} isFixed />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.avatar || User}
          alt={author.email}
          value={author.username}
          title={`- asked ${getTimeStamp(new Date(createdAt))} `}
          href={ROUTES.PROFILE(author.id.toString())}
          textStyles="body-medium text-dark400_light700"
          isAuthor
        />

        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl={Like}
            alt="like"
            value={upvotes}
            title="Upvotes"
            textStyles="small-medium text-dark400_light800"
          />

          <Metric
            imgUrl={Message}
            alt="answers"
            value={answersCount}
            title="Answers"
            textStyles="small-medium text-dark400_light800"
          />

          <Metric
            imgUrl={Eye}
            alt="views"
            value={viewsCount}
            title="Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
