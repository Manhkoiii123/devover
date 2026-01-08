import Wrapper from '@common/ui/components/wrapper/wrapper';
import { EMPTY_ANSWERS } from '@common/constants/empty';
import AnswerCard from './answer-card';
import { useGetAnswerByQuestionId } from '@common/api/endpoints/answer.api';
import { Button } from '@common/ui/components/button';

const AllAnswers = ({ questionId }: { questionId: string }) => {
  const {
    data,
    error,
    isSuccess: success,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetAnswerByQuestionId(questionId);

  const allAnswers = data?.pages.flatMap((page) => page.data) || [];
  const totalAnswers = data?.pages[0]?.meta.total || 0;

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient font-semibold">
          {totalAnswers} {totalAnswers === 1 ? 'Answer' : 'Answers'}
        </h3>
      </div>

      <Wrapper
        data={allAnswers}
        error={error}
        success={success}
        empty={EMPTY_ANSWERS}
        render={(answers) =>
          answers.map((answer) => <AnswerCard key={answer.id} {...answer} />)
        }
      />
      {hasNextPage && (
        <div className="flex justify-center">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AllAnswers;
