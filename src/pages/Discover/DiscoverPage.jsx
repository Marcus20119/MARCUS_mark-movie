import { Fragment } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';

import {
  useChangeTitleWebsite,
  useMySWR,
  usePaginate,
  useResponsive,
  useScrollOnTop,
} from '~/hooks';
import { api } from '~/utils';
import FilterBar from './FilterBar';
import { MainList } from '~/components/CardAndList';
import { MainPaginate } from '~/components/Paginate';
import LoadingBounce from '~/components/Base/Loading/Bounce';
import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';

const DiscoverPage = () => {
  useChangeTitleWebsite({ title: 'Mark Movie - Discover' });
  const location = useLocation();
  useScrollOnTop(location);
  const paramData = queryString.parse(location.search);
  const paramQuery = location.search.slice(location.search.indexOf('&'));
  const { myData: discoverData, isLoading: discoverLoading } = useMySWR({
    api: api.getDiscover(paramData.category, paramQuery),
    origin: true,
  });
  const { currentPage, setCurrentPage, handlePageClick } =
    usePaginate(location);

  const { isMobile } = useResponsive();

  return (
    <div
      className={`flex flex-col w-full min-h-screen items-start gap-[28px] !bg-mainSection ${
        !isMobile ? 'p-[40px]' : 'p-[16px] mb-3'
      }`}
    >
      <FilterBar
        paramData={paramData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {!discoverLoading &&
        discoverData.results &&
        discoverData.results.length > 0 && (
          <Fragment>
            <MainList
              listData={discoverData.results}
              type={paramData.category}
            />
            {discoverData.total_pages > 1 && (
              <MainPaginate
                totalPage={discoverData.total_pages}
                handlePageClick={handlePageClick}
                currentPage={currentPage}
              />
            )}
          </Fragment>
        )}
      {(discoverLoading || !discoverData.results) && (
        <LoadingBounce mainClass="flex justify-center items-center w-full mb-auto" />
      )}
      {!discoverLoading &&
        discoverData.results &&
        discoverData.results.length === 0 && (
          <div className="flex justify-center items-center w-full mb-auto text-lg">
            <span className="text-white">
              Sorry, we couldn't find any results...
            </span>
          </div>
        )}
    </div>
  );
};

export default withErrorBoundary(DiscoverPage, {
  FallbackComponent: ErrorFallBack,
});
