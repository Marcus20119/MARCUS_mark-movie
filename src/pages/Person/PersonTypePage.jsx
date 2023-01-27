import { Fragment, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '~/components/Bar';

import { PersonList } from '~/components/CardAndList';
import { MainPaginate } from '~/components/Paginate';
import { api } from '~/config';
import { useMySWR, usePaginate, useScrollOnTop } from '~/hooks';
import { navPerson } from '~/utils';

const TVTypePage = () => {
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
  useEffect(() => {
    navigateTo(`/person/${typeApi}?page=${currentPage}`);
  }, [navigateTo, currentPage, typeApi]);

  return (
    <div className="bg-[#222222] py-[20px] px-10  overflow-hidden">
      <Navbar navList={navPerson} />
      {!peopleLoading &&
        peopleData.results &&
        peopleData.results.length > 0 && (
          <Fragment>
            <PersonList
              peopleData={peopleData.results}
              className="my-[24px]"
              type="tv"
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
