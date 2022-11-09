import NavSection from '~/components/NavSection';
import useSWRInfinite from 'swr/infinite';
import { api, fetcher } from '~/config';

const TestPage = () => {
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    index => api.getPopular('movie', index + 1),
    fetcher
  );
  const concatData = data
    ? data.reduce(
        (newData, currentItem) => newData.concat(currentItem.results),
        []
      )
    : [];
  console.log('concatData', concatData);
  return (
    <div className="sub-layout h-screen w-full bg-[#181818]">
      <NavSection />
      <div className="relative flex-1 flex justify-center items-center w-full h-screen ">
        <button
          className="px-3 py-2 bg-[var(--primary-color)] rounded-lg text-white font-bold opacity-80 hover:opacity-100"
          onClick={() => setSize(size + 1)}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default TestPage;
