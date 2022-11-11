import { Fragment, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import FilmList from '~/components/CardAndList/FilmList';
import MainPaginate from '~/components/MainPaginate';
import { api } from '~/config';
import useMySWR from '~/hooks/useMySWR';
import usePaginate from '~/hooks/usePaginate';
import useScrollOnTop from '~/hooks/useScrollOnTop';

const MovieGeneralUpcomingPage = () => {
  useScrollOnTop();

  const location = useLocation();
  const pageQuery = location.search.slice(location.search.indexOf('?') + 6);
  const { myData: filmsData, isLoading: filmsLoading } = useMySWR({
    api: api.movie.getUpComing(pageQuery),
    origin: true,
  });
  const { currentPage, handlePageClick } = usePaginate(location);

  const navigateTo = useNavigate();
  useEffect(() => {
    navigateTo(`/movie/general/upcoming?page=${currentPage}`);
  }, [navigateTo, currentPage]);
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default MovieGeneralUpcomingPage;
