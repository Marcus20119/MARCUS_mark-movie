import PropTypes from 'prop-types';

import Banner from './Banner';
import { Navbar } from '../../Bar';
import ScrollList from './ScrollList';
import './MainSection.scss';
import { navHome } from '~/utils';
import { useResponsive } from '~/hooks';

const MainSection = ({ apiBanner, apiList, type }) => {
  const { isMobile } = useResponsive();
  return (
    <div
      className={`!bg-mainSection border-r-[1px] border-r-[#353338] overflow-hidden ${
        !isMobile ? 'px-10 py-[20px]' : 'px-2 py-[12px]'
      }`}
    >
      <Navbar navList={navHome} />
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
