'use client';
import Link from 'next/link';
import UserAvatar from '@common/ui/components/user-avatar';
import Metric from '@common/ui/components/metric';
import { ROUTES } from '@common/constants/routes';
import { getTimeStamp } from '@common/utils/date.utils';
import { formatNumber } from '@common/utils/number.utils';
import Preview from '@common/ui/components/editor/Preview';
import Message from '@common/assets/icons/message.svg';
import Eye from '@common/assets/icons/eye.svg';
import Clock from '@common/assets/icons/clock.svg';
import { useGetQuestion } from '@common/api/endpoints/question.api';
import { Tag } from '@common/types/question/question.type';
import TagCard from '@common/ui/components/tag-card';
const QuestionDetail = ({ id }: { id: string }) => {
  const { data: question } = useGetQuestion(id);
  if (!question) return null;
  const { author, title, createdAt, viewsCount, answers, content, tags } =
    question;
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between">
          <div className="flex items-center justify-start gap-1">
            <UserAvatar
              id={author.id.toString()}
              name={author.username}
              className="size-[22px]"
              fallbackClassName="text-[10px]"
            />
            <Link href={ROUTES.PROFILE(author.id.toString())}>
              <p className="paragraph-semibold text-dark300_light700">
                {author.username}
              </p>
            </Link>
          </div>
        </div>

        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full">
          {title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl={Clock}
          alt="clock icon"
          value={` asked ${getTimeStamp(new Date(createdAt))}`}
          title=""
          textStyles="small-regular text-dark400_light700"
        />

        <Metric
          imgUrl={Message}
          alt="message icon"
          value={formatNumber(answers ? answers.length : 0)}
          title=""
          textStyles="small-regular text-dark400_light700"
        />

        <Metric
          imgUrl={Eye}
          alt="View icon"
          value={formatNumber(viewsCount)}
          title=""
          textStyles="small-regular text-dark400_light700"
        />
      </div>

      <div className="w-full">
        <Preview content={content} />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag: Tag) => (
          <TagCard key={tag.id} id={tag.id as string} name={tag.name} isFixed />
        ))}
      </div>
    </>
  );
};

export default QuestionDetail;
