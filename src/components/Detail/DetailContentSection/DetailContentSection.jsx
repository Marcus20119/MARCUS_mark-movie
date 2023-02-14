import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import { useResponsive } from '~/hooks';
import MainContent from './MainContent';
import SubContent from './SubContent';

const DetailContentSection = ({ movieData }) => {
  const { isLaptop } = useResponsive();

  return (
    <div className="flex-1 flex flex-col justify-between items-start text-white">
      <div
        className={`flex flex-col w-full pb-[10px] ${isLaptop && 'h-[250px]'}`}
      >
        <MainContent movieData={movieData} />
      </div>
      <div className="flex flex-col justify-start items-start">
        <SubContent movieData={movieData} />
      </div>
    </div>
  );
};

DetailContentSection.propTypes = {
  movieData: PropTypes.object.isRequired,
};

export default withErrorBoundary(DetailContentSection, {
  FallbackComponent: ErrorFallBack,
});
