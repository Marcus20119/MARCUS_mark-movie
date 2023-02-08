// import LoadingBounce from '~/components/Base/Loading/Bounce';

import { NavSection } from '../components/NavSection';

const LoadingPage = () => {
  return (
    <div className="main-layout min-h-[120vh]">
      <NavSection />
      <div className="flex justify-center items-center w-full mt-4 mb-auto">
        {/* <LoadingBounce /> */}
      </div>
    </div>
  );
};

export default LoadingPage;
