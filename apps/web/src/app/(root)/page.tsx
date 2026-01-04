import HomePage from '@features/home/home';
interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
const Home = async ({ searchParams }: SearchParams) => {
  const { query, filter, page, pageSize } = await searchParams;
  return (
    <HomePage query={query} filter={filter} page={page} pageSize={pageSize} />
  );
};

export default Home;
