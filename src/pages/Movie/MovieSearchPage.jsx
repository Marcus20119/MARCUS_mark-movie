import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import queryString from 'query-string';

import { Navbar, SearchBar } from '~/components/Bar';
import { FilmList } from '~/components/CardAndList/FilmList';
import {
  useChangeTitleWebsite,
  useMySWR,
  usePaginate,
  useScrollOnTop,
  useSearch,
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
    api: query
      ? api.getSearch(query, 'movie', page)
      : api.getPopular('movie', page),
    origin: true,
  });

  const { input, handleSetInput, isFocus, setIsFocus } = useSearch();
  const { currentPage, handlePageClick, setCurrentPage } =
    usePaginate(location);

  const navigateTo = useNavigate();
  useEffect(() => {
    navigateTo(`/movie/search?query=${input}&page=${currentPage}`);
  }, [navigateTo, input, currentPage]);

  // Reset currentPage nếu như thay đổi từ khoá search
  useEffect(() => {
    navigateTo(`/movie/search?query=${input}&page=1`);
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <div className="!bg-mainSection py-[20px] px-10  overflow-hidden">
      <Navbar navList={navMovie} />
      <div className="mt-[24px]">
        <SearchBar
          input={input}
          handleSetInput={handleSetInput}
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          placeholder="Find Your Movie"
          type="2"
        />
        {!filmsLoading && filmsData.results && filmsData.results.length > 0 && (
          <Fragment>
            <FilmList
              filmsData={filmsData.results}
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
      </div>
    </div>
  );
};

export default MovieGeneralSearchPage;
