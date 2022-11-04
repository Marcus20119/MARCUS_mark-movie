import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

import useMySWR from '~/hooks/useMySWR';
import ErrorFallBack from '~/components/Base/ErrorFallBack';
import MovieCardListY from '~/components/CardAndList/CardListY';
import MovieCardListYLoading from '~/components/CardAndList/CardListY/Loading';

const ScrollList = ({ title = 'This is the title', apiLink, type }) => {
  const { myData: moviesData, isLoading } = useMySWR({ api: apiLink });
  return (
    <div>
      <h3 className="text-2xl text-white font-bold mb-3">{title}</h3>
      {!isLoading && moviesData && moviesData.length > 0 && (
        <MovieCardListY moviesData={moviesData} type={type} />
      )}
      {(isLoading || moviesData.length === 0) && <MovieCardListYLoading />}
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
