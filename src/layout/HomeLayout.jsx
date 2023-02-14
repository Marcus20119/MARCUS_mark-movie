import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useResponsive } from '~/hooks';
import LoadingPage from '~/pages/LoadingPage';
import { NavSection } from '../components/NavSection';

const MainLayout = () => {
  const { isTablet, isLaptop } = useResponsive();
  return (
    <Suspense fallback={<LoadingPage isHomePage={isLaptop ? true : false} />}>
      <div className={isLaptop ? 'home-layout' : isTablet ? 'main-layout' : ''}>
        <NavSection isHomePage={isLaptop ? true : false} />
        <Outlet />
      </div>
    </Suspense>
  );
};

export default MainLayout;
