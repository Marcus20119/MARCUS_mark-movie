import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useRef, useState } from 'react';
import queryString from 'query-string';

import { Navbar, SuggestionSearchBar } from '~/components/Bar';
import { MainList } from '~/components/CardAndList';
import {
  useChangeTitleWebsite,
  useMySWR,
  usePaginate,
  useResponsive,
  useScrollOnTop,
} from '~/hooks';
import { api } from '~/utils';
import { MainPaginate } from '~/components/Paginate';
import LoadingBounce from '~/components/Base/Loading/Bounce';
import { navTV } from '~/utils';

const TVSearchPage = () => {
  useChangeTitleWebsite({ title: 'Mark Movie - TV/Search' });
  const location = useLocation();
  const { query, page } = queryString.parse(location.search);
  useScrollOnTop(page);

  const { myData: filmsData, isLoading: filmsLoading } = useMySWR({
    api: query ? api.getSearch(query, 'tv', page) : api.getPopular('tv', page),
    origin: true,
  });

  const { currentPage, handlePageClick, setCurrentPage } =
    usePaginate(location);

  const [newQuery, setNewQuery] = useState(query);
  const navigateTo = useNavigate();
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      navigateTo(`/tv/search?query=${newQuery}&page=${currentPage}`);
    }
    didMountRef.current = true;
  }, [navigateTo, newQuery, currentPage]);

  const { isMobile, isTablet, isLaptop } = useResponsive();

  return (
    <div className="!bg-mainSection py-[20px] px-10  overflow-hidden">
      <Navbar navList={navTV} />
      {!query && (
        <h2
          className={`block text-white80 text-center mb-4 mt-4 ${
            isLaptop && 'text-5xl'
          } ${isTablet && 'text-4xl'}`}
        >
          {isLaptop
            ? 'Find your favorite TV Shows and more . . .'
            : 'Find your favorite Shows . . .'}
        </h2>
      )}
      <div className="mt-[24px]">
        <SuggestionSearchBar
          typeQuery="movie"
          query={query}
          setNewQuery={setNewQuery}
          setCurrentPage={setCurrentPage}
          placeholder="Find Your TV Shows . . ."
        />
        {query && (
          <Fragment>
            {!filmsLoading &&
              filmsData.results &&
              filmsData.results.length > 0 && (
                <Fragment>
                  <h3 className="italic text-xl text-white my-[24px] mx-[2px]">
                    {`Search result for "${newQuery}" (${filmsData.total_results} results found)`}
                  </h3>
                  <MainList
                    listData={filmsData.results}
                    className="my-[24px]"
                    type="tv"
                  />
                  {filmsData.total_pages > 1 && (
                    <MainPaginate
                      totalPage={filmsData.total_pages}
                      handlePageClick={handlePageClick}
                      currentPage={currentPage}
                    />
                  )}
                </Fragment>
              )}
            {!filmsLoading &&
              filmsData.results &&
              filmsData.results.length === 0 && (
                <span className="block text-[rgba(255,_255,_255,_0.8)] mt-3 ml-1">
                  No result was found! Try another keyword . . .
                </span>
              )}
            {(filmsLoading || !filmsData.results) && (
              <LoadingBounce mainClass="flex justify-center items-center w-full mb-auto mt-3" />
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default TVSearchPage;
