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
import LoadingBounce from '~/components/Base/Loading/Bounce';
import { SearchList } from '~/components/CardAndList/SearchList';

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

  const { isMobile, isTablet, isLaptop } = useResponsive();

  return (
    <div className="!bg-mainSection py-[20px] px-10 overflow-hidden">
      <div className="mt-[24px]">
        {!query && (
          <h2
            className={`block text-white80 text-center mb-4 ${
              isLaptop && 'text-5xl'
            } ${isTablet && 'text-4xl'}`}
          >
            Find your favorite movies, TV shows, people and more . . .
          </h2>
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
                  <h3 className="italic text-xl text-white my-[24px] mx-[2px]">
                    {`Search result for "${newQuery}" (${filmsData.total_results} results found)`}
                  </h3>
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

export default SearchPage;
