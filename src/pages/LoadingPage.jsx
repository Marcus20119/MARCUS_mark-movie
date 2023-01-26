import LoadingBounce from '~/components/Base/Loading/Bounce';

import { NavSection } from '../components/NavSection';

const LoadingPage = () => {
  return (
    <div className="main-layout">
      <NavSection />
      <div className="flex justify-center items-center w-full mt-4">
        <LoadingBounce />
      </div>
    </div>
  );
};

export default LoadingPage;
