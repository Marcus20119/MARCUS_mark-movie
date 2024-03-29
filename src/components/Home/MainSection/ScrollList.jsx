import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

import { useMySWR, useResponsive } from '~/hooks';
import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import {
  MovieCardListY,
  LoadingMovieCardListY,
} from '~/components/CardAndList';

const ScrollList = ({ title = 'This is the title', apiLink, type }) => {
  const { myData: moviesData, isLoading } = useMySWR({ api: apiLink });
  const { isTablet } = useResponsive();
  return (
    <div>
      <h3
        className={`text-2xl text-white font-bold mb-3 pl-1 ${
          isTablet && 'mt-2'
        }`}
      >
        {title}
      </h3>
      {!isLoading && moviesData && moviesData.length > 0 && (
        <MovieCardListY moviesData={moviesData} type={type} />
      )}
      {(isLoading || moviesData.length === 0) && <LoadingMovieCardListY />}
    </div>
  );
};

ScrollList.propTypes = {
  title: PropTypes.string,
  apiLink: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['movie', 'tv']).isRequired,
};

export default withErrorBoundary(ScrollList, {
  FallbackComponent: ErrorFallBack,
});
