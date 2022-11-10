import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import useSWRInfinite from 'swr/infinite';

import LoadingBounce from '~/components/Base/Loading/Bounce';
import ButtonPlay from '~/components/Button/Play';
import MovieCardListX from '~/components/CardAndList/CardListX';
import { api, fetcher } from '~/config';
import ErrorFallBack from '~/components/Base/ErrorFallBack';

const SearchUI = ({ type, query }) => {
  const { data, error, size, setSize } = useSWRInfinite(
    index =>
      api.getSearchMulti(query ? query : 'spiderman no way home', index + 1),
    fetcher
  );
  const searchData = data
    ? data.reduce(
        (newData, currentItem) => newData.concat(currentItem.results),
        []
      )
    : [];
  const searchLoading = !data && !error;
  const isEmpty = data?.[0]?.results?.length === 0;
  const isReachingEnd = isEmpty || data?.length >= data?.[0]?.total_pages;
  return (
    <div className="flex flex-col w-full gap-[10px] overflow-y-auto scrollbar-hide">
      {searchLoading || !searchData || searchData.length === 0 ? (
        <LoadingBounce />
      ) : (
        <Fragment>
          <MovieCardListX moviesData={searchData} type={type} />
          {!isReachingEnd && (
            <ButtonPlay
              message="See more"
              displayIcon={false}
              widthType="full"
              onClick={() => setSize(size + 1)}
            />
          )}
        </Fragment>
      )}
    </div>
  );
};

SearchUI.propTypes = {
  type: PropTypes.oneOf(['movie', 'tv']).isRequired,
  query: PropTypes.any.isRequired,
};

export default withErrorBoundary(SearchUI, {
  FallbackComponent: ErrorFallBack,
});
