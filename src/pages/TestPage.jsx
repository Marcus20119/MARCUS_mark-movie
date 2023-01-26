import useSWRInfinite from 'swr/infinite';
import { NavSection } from '~/components/NavSection';
import { fetcher } from '~/config';

const TestPage = () => {
  const { data, size, setSize } = useSWRInfinite(
    // index => api.getPopular('movie', index + 1),
    index =>
      `https://api.themoviedb.org/3/discover/movie?api_key=ca5bec6407d971b84c656385ba10351d&primary_release_year=2020&with_origin_country=VN&page=${
        index + 1
      }`,

    fetcher
  );
  const concatData = data
    ? data.reduce(
        (newData, currentItem) => newData.concat(currentItem.results),
        []
      )
    : [];
  const isEmpty = data?.[0]?.results?.length === 0;
  const isReachingEnd = isEmpty || data?.length >= data?.[0]?.total_pages;
  console.log('concatData', concatData);
  console.log('isReachingEnd', isReachingEnd);
  return (
    <div className="main-layout h-screen w-full bg-[#181818]">
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
