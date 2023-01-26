import { Fragment, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '~/components/Bar';

import { FilmList } from '~/components/CardAndList';
import { MainPaginate } from '~/components/Paginate';
import { api } from '~/config';
import { useMySWR, usePaginate, useScrollOnTop } from '~/hooks';
import { navMovie } from '~/utils';

const MovieTypePage = () => {
  useScrollOnTop();
  const location = useLocation();
  const pageQuery = location.search.slice(location.search.indexOf('?') + 6);
  const typeApi = location.pathname.split('/')[2];
  let myApi;
  switch (typeApi) {
    case 'now-playing': {
      myApi = api.movie.getNowPlaying(pageQuery);
      break;
    }
    case 'upcoming': {
      myApi = api.movie.getUpComing(pageQuery);
      break;
    }
    case 'popular': {
      myApi = api.getPopular('movie', pageQuery);
      break;
    }
    case 'top-rated': {
      myApi = api.getTopRated('movie', pageQuery);
      break;
    }
    default:
      break;
  }
  const { myData: filmsData, isLoading: filmsLoading } = useMySWR({
    api: myApi,
    origin: true,
  });
  const { currentPage, handlePageClick } = usePaginate(location);

  const navigateTo = useNavigate();
  useEffect(() => {
    navigateTo(`/movie/${typeApi}?page=${currentPage}`);
  }, [navigateTo, currentPage, typeApi]);
  return (
    <div className="bg-[#222222] py-[20px] px-10  overflow-hidden">
      <Navbar navList={navMovie} />
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
    </div>
  );
};

export default MovieTypePage;
