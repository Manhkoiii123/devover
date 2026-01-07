import QuestionDetail from '@features/questions/question-detail/question-detail-page';
interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}
const QuestionDetailPage = async ({ params }: RouteParams) => {
  const { id } = await params;
  console.log('🚀 ~ QuestionDetailPage ~ id:', id);
  return <QuestionDetail id={id} />;
};
export default QuestionDetailPage;
