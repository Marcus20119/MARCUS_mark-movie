import PropTypes from 'prop-types';

import Banner from './Banner';
import './MainSection.scss';
import Navbar from './Navbar';
import ScrollList from './ScrollList';

const MainSection = ({ apiBanner, apiList, type }) => {
  return (
    <div className="bg-[#222222] py-[20px] px-10 border-x-[1px] border-x-[#353338] overflow-hidden">
      <Navbar />
      {/* {children} */}
      <Banner apiLink={apiBanner} type={type} />
      <div className="flex flex-col gap-4">
        {apiList.map(item => (
          <ScrollList
            key={item.name}
            title={item.name}
            apiLink={item.api}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};
MainSection.propTypes = {
  apiBanner: PropTypes.string.isRequired,
  apiList: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['movie', 'tv']).isRequired,
};

export default MainSection;
