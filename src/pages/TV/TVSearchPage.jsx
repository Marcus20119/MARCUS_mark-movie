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
import { navTV } from '~/utils';
import {
  SearchAnnounce,
  SearchHeader,
  SearchNotFoundAndLoading,
} from '~/components/Search';

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

  const { isMobile, isLaptop } = useResponsive();

  return (
    <div
      className={`!bg-mainSection overflow-hidden ${
        !isMobile ? 'py-[20px] px-10' : 'p-[16px] min-h-screen'
      }`}
    >
      <Navbar navList={navTV} />
      {!query && (
        <SearchHeader
          message={
            isLaptop
              ? 'Find your favorite TV Shows and more . . .'
              : 'Find your favorite Shows . . .'
          }
        />
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
                  <SearchAnnounce
                    query={newQuery}
                    totalResult={filmsData.total_results}
                  />
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
            <SearchNotFoundAndLoading loading={filmsLoading} data={filmsData} />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default TVSearchPage;
