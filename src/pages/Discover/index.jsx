import { Fragment, useEffect } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

import usePaginate from '~/hooks/usePaginate';
import useMySWR from '~/hooks/useMySWR';
import { api } from '~/config';
import DiscoverFilterBar from '~/components/Discover/FilterBar';
import NavSection from '~/components/NavSection';
import FilmList from '~/components/CardAndList/FilmList';
import MainPaginate from '~/components/MainPaginate';
import LoadingBounce from '~/components/Base/Loading/Bounce';

const DiscoverPage = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  const location = useLocation();
  const paramData = queryString.parse(location.search);
  const paramQuery = location.search.slice(location.search.indexOf('&'));
  const { myData: discoverData, isLoading: discoverLoading } = useMySWR({
    api: api.getDiscover(paramData.category, paramQuery),
    origin: true,
  });
  const { currentPage, setCurrentPage, handlePageClick } =
    usePaginate(location);

  return (
    <div className="sub-layout min-h-screen w-full">
      <NavSection />
      <div className="flex flex-col w-full min-h-screen items-start gap-[28px] bg-[#222222] p-[40px]">
        <DiscoverFilterBar
          paramData={paramData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        {!discoverLoading &&
          discoverData.results &&
          discoverData.results.length > 0 && (
            <Fragment>
              <FilmList
                filmsData={discoverData.results}
                type={paramData.category}
              />
              {discoverData.total_pages > 1 && (
                <MainPaginate
                  totalPage={discoverData.total_pages}
                  handlePageClick={handlePageClick}
                  currentPage={currentPage}
                />
              )}
            </Fragment>
          )}
        {(discoverLoading || !discoverData.results) && (
          <LoadingBounce mainClass="flex justify-center items-center w-full mb-auto" />
        )}
        {!discoverLoading &&
          discoverData.results &&
          discoverData.results.length === 0 && (
            <div className="flex justify-center items-center w-full mb-auto text-lg">
              <span className="text-white">
                Sorry, we couldn't find any results...
              </span>
            </div>
          )}
      </div>
    </div>
  );
};

export default DiscoverPage;
