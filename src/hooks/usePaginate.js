import { useCallback, useState } from 'react';

export default function usePaginate(location) {
  const [currentPage, setCurrentPage] = useState(
    location.search.slice(location.search.indexOf('page=') + 5)
  );
  const handlePageClick = useCallback(event => {
    setCurrentPage(event.selected + 1);
  }, []);
  return {
    currentPage,
    setCurrentPage,
    handlePageClick,
  };
}
