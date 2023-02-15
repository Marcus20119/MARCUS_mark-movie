import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useResponsive } from '~/hooks';
import LoadingPage from '~/pages/LoadingPage';
import { NavSection, NavSectionMobile } from '../components/NavSection';

const MainLayout = () => {
  const { isMobile, isTablet, isLaptop } = useResponsive();
  return (
    <Suspense fallback={<LoadingPage isHomePage={isLaptop ? true : false} />}>
      <div
        className={
          isLaptop
            ? 'home-layout'
            : isTablet
            ? 'main-layout'
            : 'w-full mt-[56px]'
        }
      >
        {!isMobile ? (
          <NavSection isHomePage={isLaptop ? true : false} />
        ) : (
          <NavSectionMobile />
        )}
        <Outlet />
      </div>
    </Suspense>
  );
};

export default MainLayout;
