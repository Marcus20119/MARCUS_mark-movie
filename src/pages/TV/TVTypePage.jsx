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
  useResponsive,
  useScrollOnTop,
} from '~/hooks';
import { navTV } from '~/utils';
import LoadingBounce from '~/components/Base/Loading/Bounce';

const TVTypePage = () => {
  const location = useLocation();
  const pageQuery = location.search.slice(location.search.indexOf('?') + 6);
  useScrollOnTop(pageQuery);
  const typeApi = location.pathname.split('/')[2];

  const typeName = typeApi
    .split('-')
    .map(item => item[0].toUpperCase() + item.substring(1));
  useChangeTitleWebsite({
    title: typeName ? `TV - ${typeName.join(' ')}` : '',
    rerenderCondition: [typeName],
  });

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
  const { currentPage, handlePageClick, setCurrentPage } =
    usePaginate(location);

  const navigateTo = useNavigate();
  const didMountRef1 = useRef(false);
  useEffect(() => {
    if (didMountRef1.current) {
      navigateTo(`/tv/${typeApi}?page=${currentPage}`);
    }
    didMountRef1.current = true;
  }, [navigateTo, currentPage]);

  // Reset currentPage nếu như chuyển type
  const didMountRef2 = useRef(false);
  useEffect(() => {
    if (didMountRef2.current) {
      navigateTo(`/tv/${typeApi}?page=1`);
      setCurrentPage(1);
    }
    didMountRef2.current = true;
  }, [typeApi]);

  const { isMobile } = useResponsive();

  return (
    <div
      className={`!bg-mainSection overflow-hidden ${
        !isMobile ? 'py-[20px] px-10' : 'p-[16px] min-h-screen'
      }`}
    >
      <Navbar navList={navTV} />
      {!filmsLoading && filmsData.results && filmsData.results.length > 0 && (
        <Fragment>
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
          {(filmsLoading || !filmsData.results) && (
            <LoadingBounce mainClass="flex justify-center items-center w-full mb-auto mt-3" />
          )}
        </Fragment>
      )}
    </div>
  );
};

export default TVTypePage;
