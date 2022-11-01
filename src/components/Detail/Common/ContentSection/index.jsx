import PropTypes from 'prop-types';

import DetailMainContent from './MainContent';
import DetailSubContent from './SubContent';

const DetailContentSection = ({ movieData }) => {
  return (
    <div className="flex-1 flex flex-col justify-between items-start text-white">
      <div className="flex flex-col h-[250px] w-full pb-[10px]">
        <DetailMainContent movieData={movieData} />
      </div>
      <div className="flex flex-col justify-start items-start">
        <DetailSubContent movieData={movieData} />
      </div>
    </div>
  );
};

DetailContentSection.propTypes = {
  movieData: PropTypes.object.isRequired,
};

export default DetailContentSection;
