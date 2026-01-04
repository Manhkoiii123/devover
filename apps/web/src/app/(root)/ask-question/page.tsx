import QuestionForm from '@features/questions/form/create-question-form';
const AskAQuestion = async () => {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <QuestionForm />
      </div>
    </div>
  );
};

export default AskAQuestion;
