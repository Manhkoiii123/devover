import Wrapper from '@common/ui/components/wrapper/wrapper';
import { EMPTY_ANSWERS } from '@common/constants/empty';
import AnswerCard from './answer-card';
import { useGetAnswerByQuestionId } from '@common/api/endpoints/answer.api';

const AllAnswers = ({ questionId }: { questionId: string }) => {
  const {
    data,
    error,
    isSuccess: success,
  } = useGetAnswerByQuestionId(questionId);
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient font-semibold">
          {data?.meta.total} {data?.meta.total === 1 ? 'Answer' : 'Answers'}
        </h3>
      </div>

      <Wrapper
        data={data?.data || []}
        error={error}
        success={success}
        empty={EMPTY_ANSWERS}
        render={(answers) =>
          answers.map((answer) => <AnswerCard key={answer.id} {...answer} />)
        }
      />
    </div>
  );
};

export default AllAnswers;
