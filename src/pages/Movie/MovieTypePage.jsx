/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '~/components/Bar';

import { MainList } from '~/components/CardAndList';
import { MainPaginate } from '~/components/Paginate';
import { api } from '~/utils';
import {
  useChangeTitleWebsite,
  useMySWR,
  usePaginate,
  useScrollOnTop,
} from '~/hooks';
import { navMovie } from '~/utils';
import LoadingBounce from '~/components/Base/Loading/Bounce';

const MovieTypePage = () => {
  const location = useLocation();
  const pageQuery = location.search.slice(location.search.indexOf('?') + 6);
  useScrollOnTop(pageQuery);
  const typeApi = location.pathname.split('/')[2];

  const typeName = typeApi
    .split('-')
    .map(item => item[0].toUpperCase() + item.substring(1));
  useChangeTitleWebsite({
    title: typeName ? `Movie - ${typeName.join(' ')}` : '',
    rerenderCondition: [typeName],
  });

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
  const { currentPage, handlePageClick, setCurrentPage } =
    usePaginate(location);

  const navigateTo = useNavigate();
  const didMountRef1 = useRef(false);
  useEffect(() => {
    if (didMountRef1.current) {
      navigateTo(`/movie/${typeApi}?page=${currentPage}`);
    }
    didMountRef1.current = true;
  }, [navigateTo, currentPage]);

  // Reset currentPage nếu như chuyển type
  const didMountRef2 = useRef(false);
  useEffect(() => {
    if (didMountRef2.current) {
      navigateTo(`/movie/${typeApi}?page=1`);
      setCurrentPage(1);
    }
    didMountRef2.current = true;
  }, [typeApi]);

  return (
    <div className="!bg-mainSection py-[20px] px-10 overflow-hidden">
      <Navbar navList={navMovie} />
      {!filmsLoading && filmsData.results && filmsData.results.length > 0 && (
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
      {(filmsLoading || !filmsData.results) && (
        <LoadingBounce mainClass="flex justify-center items-center w-full mb-auto mt-3" />
      )}
    </div>
  );
};

export default MovieTypePage;
