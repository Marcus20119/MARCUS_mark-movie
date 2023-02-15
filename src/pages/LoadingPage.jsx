// import LoadingBounce from '~/components/Base/Loading/Bounce';

import { useResponsive } from '~/hooks';
import { NavSection, NavSectionMobile } from '../components/NavSection';

const LoadingPage = ({ isHomePage }) => {
  const { isMobile, isLaptop } = useResponsive();

  return (
    <div className={`main-layout ${isLaptop && 'min-h-[120vh]'}`}>
      {!isMobile ? (
        <NavSection isHomePage={isHomePage} />
      ) : (
        <NavSectionMobile />
      )}
      <div className="flex justify-center items-center w-full mt-4 mb-auto "></div>
    </div>
  );
};

export default LoadingPage;
