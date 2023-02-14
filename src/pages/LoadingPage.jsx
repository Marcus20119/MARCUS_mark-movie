// import LoadingBounce from '~/components/Base/Loading/Bounce';

import { useResponsive } from '~/hooks';
import { NavSection } from '../components/NavSection';

const LoadingPage = ({ isHomePage }) => {
  const { isLaptop } = useResponsive();

  return (
    <div className={`main-layout ${isLaptop && 'min-h-[120vh]'}`}>
      <NavSection isHomePage={isHomePage} />
      <div className="flex justify-center items-center w-full mt-4 mb-auto "></div>
    </div>
  );
};

export default LoadingPage;
