import { Fragment, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '~/components/Bar';

import { FilmList } from '~/components/CardAndList/FilmList';
import { MainPaginate } from '~/components/Paginate';
import { api } from '~/config';
import { useMySWR, usePaginate, useScrollOnTop } from '~/hooks';
import { navTV } from '~/utils';

const TVTypePage = () => {
  const location = useLocation();
  const pageQuery = location.search.slice(location.search.indexOf('?') + 6);
  useScrollOnTop(pageQuery);
  const typeApi = location.pathname.split('/')[2];
  let myApi;
  switch (typeApi) {
    case 'on-the-air': {
      myApi = api.tv.getOnTheAir(pageQuery);
      break;
    }
    case 'airing-today': {
      myApi = api.tv.getAiringToday(pageQuery);
      break;
    }
    case 'popular': {
      myApi = api.getPopular('tv', pageQuery);
      break;
    }
    case 'top-rated': {
      myApi = api.getTopRated('tv', pageQuery);
      break;
    }
    default:
      break;
  }
  const { myData: filmsData, isLoading: filmsLoading } = useMySWR({
    api: myApi,
    origin: true,
  });
  console.log('filmsLoading', filmsLoading);
  const { currentPage, handlePageClick } = usePaginate(location);

  const navigateTo = useNavigate();
  useEffect(() => {
    navigateTo(`/tv/${typeApi}?page=${currentPage}`);
  }, [navigateTo, currentPage, typeApi]);

  return (
    <div className="bg-[#222222] py-[20px] px-10  overflow-hidden">
      <Navbar navList={navTV} />
      {!filmsLoading && filmsData.results && filmsData.results.length > 0 && (
        <Fragment>
          <FilmList
            filmsData={filmsData.results}
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
    </div>
  );
};

export default TVTypePage;
