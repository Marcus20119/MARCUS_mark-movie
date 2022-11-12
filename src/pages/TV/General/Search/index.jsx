import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import queryString from 'query-string';

import usePaginate from '~/hooks/usePaginate';
import useScrollOnTop from '~/hooks/useScrollOnTop';
import useSearch from '~/hooks/useSearch';
import SearchBar from '~/components/SearchBar';

const TVGeneralSearchPage = () => {
  useScrollOnTop();

  const location = useLocation();
  console.log(queryString.parse(location.search));

  const { input, handleSetInput, isFocus, setIsFocus } = useSearch();
  const { currentPage, handlePageClick } = usePaginate(location);

  const navigateTo = useNavigate();
  useEffect(() => {
    navigateTo(`/tv/general/search?query=${input}&page=${currentPage}`);
  }, [navigateTo, input, currentPage]);

  return (
    <div className="mt-[24px]">
      <SearchBar
        input={input}
        handleSetInput={handleSetInput}
        isFocus={isFocus}
        setIsFocus={setIsFocus}
      />
    </div>
  );
};

export default TVGeneralSearchPage;
