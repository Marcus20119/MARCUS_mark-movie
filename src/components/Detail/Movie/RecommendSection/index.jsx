import { withErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';

import ErrorFallBack from '~/components/Base/ErrorFallBack';
import RecommendList from '~/components/Common/Movie/RecommendList';

const RecommendSection = ({ recommendsData }) => {
  return (
    <div className="relative w-full p-[30px] bg-[#222222]">
      <h3 className="text-2xl text-white font-bold mb-3">You may also like</h3>
      <RecommendList
        recommendsData={recommendsData}
        numberOfCol={5}
        type="movie"
      />
    </div>
  );
};

RecommendSection.propTypes = {
  recommendsData: PropTypes.array.isRequired,
};

export default withErrorBoundary(RecommendSection, {
  FallbackComponent: ErrorFallBack,
});
