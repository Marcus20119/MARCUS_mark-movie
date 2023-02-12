import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import queryString from 'query-string';

import { Navbar, SuggestionSearchBar } from '~/components/Bar';
import { MainList } from '~/components/CardAndList';
import {
  useChangeTitleWebsite,
  useMySWR,
  usePaginate,
  useScrollOnTop,
} from '~/hooks';
import { api } from '~/utils';
import { MainPaginate } from '~/components/Paginate';
import LoadingBounce from '~/components/Base/Loading/Bounce';
import { navMovie } from '~/utils';

const MovieGeneralSearchPage = () => {
  useChangeTitleWebsite({ title: 'Mark Movie - Movie/Search' });
  const location = useLocation();
  const { query, page } = queryString.parse(location.search);
  useScrollOnTop(page);

  const { myData: filmsData, isLoading: filmsLoading } = useMySWR({
    api: api.getSearch(query, 'movie', page),
    origin: true,
  });

  const { currentPage, handlePageClick, setCurrentPage } =
    usePaginate(location);

  const [newQuery, setNewQuery] = useState(query);
  const navigateTo = useNavigate();
  useEffect(() => {
    navigateTo(`/movie/search?query=${newQuery}&page=${currentPage}`);
  }, [navigateTo, newQuery, currentPage]);

  return (
    <div className="!bg-mainSection py-[20px] px-10  overflow-hidden">
      <Navbar navList={navMovie} />
      {!query && (
        <h2 className="block text-5xl text-white80 text-center mb-4 mt-4">
          Find your favorite movies and more . . .
        </h2>
      )}
      <div className="mt-[24px]">
        <SuggestionSearchBar
          typeQuery="movie"
          query={query}
          setNewQuery={setNewQuery}
          setCurrentPage={setCurrentPage}
          placeholder="Find Your Movie . . ."
        />
        {query && (
          <Fragment>
            <h3 className="italic text-xl text-white my-[24px] mx-[2px]">
              {`Search result for "${newQuery}" (${filmsData.total_results} results found)`}
            </h3>
            {!filmsLoading &&
              filmsData.results &&
              filmsData.results.length > 0 && (
                <Fragment>
                  <MainList
                    listData={filmsData.results}
                    className="my-[24px]"
                    type="movie"
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

export default MovieGeneralSearchPage;
