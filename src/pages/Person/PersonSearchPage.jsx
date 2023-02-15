import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useRef, useState } from 'react';
import queryString from 'query-string';

import { Navbar, SuggestionSearchBar } from '~/components/Bar';
import {
  useChangeTitleWebsite,
  useMySWR,
  usePaginate,
  useResponsive,
  useScrollOnTop,
} from '~/hooks';
import { api } from '~/utils';
import { MainPaginate } from '~/components/Paginate';
import { navPerson } from '~/utils';
import { MainList } from '~/components/CardAndList';
import {
  SearchAnnounce,
  SearchHeader,
  SearchNotFoundAndLoading,
} from '~/components/Search';

const PersonSearchPage = () => {
  useChangeTitleWebsite({
    title: 'Mark Movie - Celebs/Search',
  });
  const location = useLocation();
  const { query, page } = queryString.parse(location.search);
  useScrollOnTop(page);

  const { myData: peopleData, isLoading: peopleLoading } = useMySWR({
    api: api.getSearch(query, 'person', page),
    origin: true,
  });

  const { currentPage, handlePageClick, setCurrentPage } =
    usePaginate(location);

  const [newQuery, setNewQuery] = useState(query);
  const navigateTo = useNavigate();
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      navigateTo(`/person/search?query=${newQuery}&page=${currentPage}`);
    }
    didMountRef.current = true;
  }, [navigateTo, newQuery, currentPage]);

  const { isMobile, isLaptop } = useResponsive();

  return (
    <div
      className={`!bg-mainSection overflow-hidden ${
        !isMobile ? 'py-[20px] px-10' : 'p-[16px] min-h-screen'
      }`}
    >
      <Navbar navList={navPerson} />
      {!query && (
        <SearchHeader
          message={
            isLaptop
              ? 'Find your favorite people and more . . .'
              : 'Find your favorite people . . .'
          }
        />
      )}
      <div className="mt-[24px]">
        <SuggestionSearchBar
          typeQuery="person"
          query={query}
          setNewQuery={setNewQuery}
          setCurrentPage={setCurrentPage}
          placeholder="Find Your Actor . . ."
        />
        {query && (
          <Fragment>
            {!peopleLoading &&
              peopleData.results &&
              peopleData.results.length > 0 && (
                <Fragment>
                  <SearchAnnounce
                    query={newQuery}
                    totalResult={peopleData.total_results}
                  />

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
            <SearchNotFoundAndLoading
              loading={peopleLoading}
              data={peopleData}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default PersonSearchPage;
