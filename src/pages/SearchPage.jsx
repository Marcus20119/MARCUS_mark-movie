import { Fragment, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import { SuggestionSearchBar } from '~/components/Bar';
import {
  useChangeTitleWebsite,
  useMySWR,
  usePaginate,
  useResponsive,
  useScrollOnTop,
} from '~/hooks';
import { api } from '~/utils';
import { MainPaginate } from '~/components/Paginate';
import { SearchList } from '~/components/CardAndList/SearchList';
import {
  SearchAnnounce,
  SearchHeader,
  SearchNotFoundAndLoading,
} from '~/components/Search';

const SearchPage = () => {
  useChangeTitleWebsite({ title: 'Mark Movie - Search' });

  const location = useLocation();
  const { query, page } = queryString.parse(location.search);
  useScrollOnTop(page);
  const { myData: filmsData, isLoading: filmsLoading } = useMySWR({
    api: api.getSearchMulti(query, page),
    origin: true,
  });
  const { currentPage, handlePageClick, setCurrentPage } =
    usePaginate(location);

  const [newQuery, setNewQuery] = useState(query);
  const navigateTo = useNavigate();
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      navigateTo(`/search?query=${newQuery}&page=${currentPage}`);
    }
    didMountRef.current = true;
  }, [navigateTo, newQuery, currentPage]);

  const { isMobile } = useResponsive();

  return (
    <div
      className={`!bg-mainSection overflow-hidden ${
        !isMobile ? 'py-[20px] px-10' : 'p-[16px] min-h-screen'
      }`}
    >
      <div className={!isMobile ? 'mt-[24px]' : 'mt-[8px]'}>
        {!query && (
          <SearchHeader message="Find your favorite movies, TV shows, people and more . . ." />
        )}
        <SuggestionSearchBar
          typeQuery="multi"
          query={query}
          setNewQuery={setNewQuery}
          setCurrentPage={setCurrentPage}
          placeholder="Search . . ."
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
                  <SearchList
                    searchData={filmsData.results}
                    className="my-[24px]"
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

export default SearchPage;
