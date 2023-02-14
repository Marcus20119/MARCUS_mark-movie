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
import { navPerson } from '~/utils';

const TVTypePage = () => {
  useChangeTitleWebsite({
    title: 'Mark Movie - Celebs',
  });
  const location = useLocation();
  const pageQuery = location.search.slice(location.search.indexOf('?') + 6);
  useScrollOnTop(pageQuery);
  const typeApi = location.pathname.split('/')[2];
  let myApi;
  switch (typeApi) {
    case 'popular': {
      myApi = api.getPopular('person', pageQuery);
      break;
    }
    default:
      break;
  }
  const { myData: peopleData, isLoading: peopleLoading } = useMySWR({
    api: myApi,
    origin: true,
  });
  const { currentPage, handlePageClick } = usePaginate(location);

  const navigateTo = useNavigate();
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      navigateTo(`/person/${typeApi}?page=${currentPage}`);
    }
    didMountRef.current = true;
  }, [navigateTo, currentPage, typeApi]);

  return (
    <div className="!bg-mainSection py-[20px] px-10  overflow-hidden">
      <Navbar navList={navPerson} />
      {!peopleLoading &&
        peopleData.results &&
        peopleData.results.length > 0 && (
          <Fragment>
            <MainList
              listData={peopleData.results}
              className="my-[24px]"
              type="person"
            />
            {peopleData.total_pages > 1 && (
              <MainPaginate
                totalPage={peopleData.total_pages}
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
