// import LoadingBounce from '~/components/Base/Loading/Bounce';

import { NavSection } from '../components/NavSection';

const LoadingPage = ({ isHomePage }) => {
  return (
    <div className="main-layout min-h-[120vh]">
      <NavSection isHomePage={isHomePage} />
      <div className="flex justify-center items-center w-full mt-4 mb-auto"></div>
    </div>
  );
};

export default LoadingPage;
