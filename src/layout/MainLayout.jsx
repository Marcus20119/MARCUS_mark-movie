import { Outlet } from 'react-router-dom';
import { NavSection, NavSectionMobile } from '~/components/NavSection';
import { useResponsive } from '~/hooks';

const MainLayout = () => {
  const { isMobile, isLaptop } = useResponsive();
  return (
    <div
      className={` transition-none ${isLaptop && 'min-h-[120vh]'} ${
        !isMobile ? 'main-layout' : 'w-full mt-[56px]'
      }`}
    >
      {!isMobile ? <NavSection /> : <NavSectionMobile />}
      <Outlet />
    </div>
  );
};

export default MainLayout;
