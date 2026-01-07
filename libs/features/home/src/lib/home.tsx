'use client';
import { useGetQuestions } from '@common/api/endpoints/question.api';
import { ROUTES } from '@common/constants/routes';
import { Button } from '@common/ui/components/button';
import Filter from '../components/filter';
import { HomePageFilters } from '@common/constants/filters';
import Link from 'next/link';
import LocalSearch from '../components/search';
import SearchIcon from '@common/assets/icons/search.svg';
import Wrapper from '@common/ui/components/wrapper/wrapper';
import { EMPTY_QUESTION } from '@common/constants/empty';
import QuestionCard from '../components/question-card';
interface SearchParams {
  query: string;
  filter: string;
  page: string;
  pageSize: string;
}
const HomePage = ({ query, filter, page, pageSize }: SearchParams) => {
  const {
    data: dataListQuestion,
    isLoading,
    isSuccess,
    error,
  } = useGetQuestions(query, filter);

  // if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          className="primary-gradient min-h-11.5 px-4 py-3 text-light-900!"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}> Ask a Question </Link>
        </Button>
      </section>
      <div className="mt-11">
        <LocalSearch
          route="/"
          imgSrc={SearchIcon}
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </div>
      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </section>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Wrapper
            success={isSuccess}
            error={error}
            data={dataListQuestion?.data || []}
            empty={EMPTY_QUESTION}
            render={(questions) => (
              <div className="mt-10 flex w-full flex-col gap-6">
                {questions.map((question) => (
                  <QuestionCard key={question.id} question={question} />
                ))}
              </div>
            )}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
