import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import queryString from 'query-string';

import { Navbar, SearchBar } from '~/components/Bar';
import { useMySWR, usePaginate, useScrollOnTop, useSearch } from '~/hooks';
import { api } from '~/utils';
import { MainPaginate } from '~/components/Paginate';
import LoadingBounce from '~/components/Base/Loading/Bounce';
import { navPerson } from '~/utils';
import { PersonList } from '~/components/CardAndList';

const PersonSearchPage = () => {
  const location = useLocation();
  const { query, page } = queryString.parse(location.search);
  useScrollOnTop(page);

  const { myData: peopleData, isLoading: peopleLoading } = useMySWR({
    api: query
      ? api.getSearch(query, 'person', page)
      : api.getPopular('person', page + 1),
    origin: true,
  });

  const { input, handleSetInput, isFocus, setIsFocus } = useSearch();
  const { currentPage, handlePageClick } = usePaginate(location);

  const navigateTo = useNavigate();
  useEffect(() => {
    navigateTo(`/person/search?query=${input}&page=${currentPage}`);
  }, [navigateTo, input, currentPage]);

  return (
    <div className="!bg-mainSection py-[20px] px-10 overflow-hidden">
      <Navbar navList={navPerson} />
      <div className="mt-[24px]">
        <SearchBar
          input={input}
          handleSetInput={handleSetInput}
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          placeholder="Find Your Actor"
        />
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
      </div>
    </div>
  );
};

export default PersonSearchPage;
