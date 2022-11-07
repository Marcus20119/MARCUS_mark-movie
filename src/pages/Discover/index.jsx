import { useEffect, useState } from 'react';
import DiscoverFilterBar from '~/components/Discover/FilterBar';
import NavSection from '~/components/NavSection';
import { api } from '~/config';
import useMySWR from '~/hooks/useMySWR';
import FilmList from '~/components/CardAndList/FilmList';

const DiscoverPage = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);
  const [category, setCategory] = useState('movie');
  const [queries, setQueries] = useState({});
  const apiQuery = Object.values(queries).join('&');

  const { myData: discoverData, isLoading: discoverLoading } = useMySWR({
    api: api.getDiscover(category, apiQuery),
  });

  return (
    <div className="sub-layout h-screen w-full">
      <NavSection />
      <div className="flex flex-col w-full min-h-screen justify-between items-start gap-[28px] bg-[#222222] p-[40px]">
        <DiscoverFilterBar
          category={category}
          setCategory={setCategory}
          setQueries={setQueries}
        />
        {!discoverLoading && discoverData.length > 0 && (
          <FilmList filmsData={discoverData} type={category} />
        )}
      </div>
    </div>
  );
};

export default DiscoverPage;
