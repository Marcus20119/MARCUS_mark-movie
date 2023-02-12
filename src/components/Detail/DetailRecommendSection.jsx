import { withErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';

import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import { MainList } from '~/components/CardAndList';

const DetailRecommendSection = ({ recommendsData }) => {
  return (
    <div className="relative w-full p-[30px] !bg-mainSection">
      <h3 className="text-2xl text-white font-bold mb-3">You may also like</h3>
      <MainList listData={recommendsData} numberOfCol={5} type="movie" />
    </div>
  );
};

DetailRecommendSection.propTypes = {
  recommendsData: PropTypes.array.isRequired,
};

export default withErrorBoundary(DetailRecommendSection, {
  FallbackComponent: ErrorFallBack,
});
