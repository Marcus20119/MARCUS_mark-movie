import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

import useMySWR from '../../../hooks/useMySWR';
import ErrorFallBack from '../../Base/ErrorFallBack';
import MovieCardListY from '../../Common/Movie/CardListY';

const ScrollList = ({ title = 'This is the title', apiLink }) => {
  const { myData: moviesData } = useMySWR({ api: apiLink });
  return (
    <div>
      <h3 className="text-2xl text-white font-bold mb-3">{title}</h3>
      {moviesData && moviesData.length > 0 && (
        <MovieCardListY moviesData={moviesData} />
      )}
    </div>
  );
};

ScrollList.propTypes = {
  title: PropTypes.string,
  apiLink: PropTypes.string.isRequired,
};

export default withErrorBoundary(ScrollList, {
  FallbackComponent: ErrorFallBack,
});
