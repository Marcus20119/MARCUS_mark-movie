import { withErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';

import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import { MainList } from '~/components/CardAndList';
import { useResponsive } from '~/hooks';

const DetailRecommendSection = ({ recommendsData }) => {
  const { isMobile } = useResponsive();

  return (
    <div
      className={`relative w-full !bg-mainSection ${
        !isMobile ? 'p-[30px]' : 'py-[20px] px-[16px]'
      }`}
    >
      <h3 className="text-2xl text-white font-bold mb-3">You may also like</h3>
      <MainList listData={recommendsData} type="movie" />
    </div>
  );
};

DetailRecommendSection.propTypes = {
  recommendsData: PropTypes.array.isRequired,
};

export default withErrorBoundary(DetailRecommendSection, {
  FallbackComponent: ErrorFallBack,
});
