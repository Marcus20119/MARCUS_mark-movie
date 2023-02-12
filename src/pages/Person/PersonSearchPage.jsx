import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import queryString from 'query-string';

import { Navbar, SuggestionSearchBar } from '~/components/Bar';
import {
  useChangeTitleWebsite,
  useMySWR,
  usePaginate,
  useScrollOnTop,
} from '~/hooks';
import { api } from '~/utils';
import { MainPaginate } from '~/components/Paginate';
import LoadingBounce from '~/components/Base/Loading/Bounce';
import { navPerson } from '~/utils';
import { MainList } from '~/components/CardAndList';

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
  useEffect(() => {
    navigateTo(`/person/search?query=${newQuery}&page=${currentPage}`);
  }, [navigateTo, newQuery, currentPage]);

  return (
    <div className="!bg-mainSection py-[20px] px-10 overflow-hidden">
      <Navbar navList={navPerson} />
      {!query && (
        <h2 className="block text-5xl text-white80 text-center mb-4">
          Find your favorite people and more . . .
        </h2>
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
            <h3 className="italic text-xl text-white my-[24px] mx-[2px]">
              {`Search result for "${newQuery}" (${peopleData.total_results} results found)`}
            </h3>
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
            {!peopleLoading &&
              peopleData.results &&
              peopleData.results.length === 0 && (
                <span className="block text-[rgba(255,_255,_255,_0.8)] mt-3 ml-1">
                  No result was found! Try another keyword . . .
                </span>
              )}
            {(peopleLoading || !peopleData.results) && (
              <LoadingBounce mainClass="flex justify-center items-center w-full mb-auto mt-3" />
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default PersonSearchPage;
