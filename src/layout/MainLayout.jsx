import { Outlet } from 'react-router-dom';
import { NavSection } from '~/components/NavSection';
import { useResponsive } from '~/hooks';

const MainLayout = () => {
  const { isLaptop } = useResponsive();
  return (
    <div
      className={` transition-none main-layout ${isLaptop && 'min-h-[120vh]'}`}
    >
      <NavSection />
      <Outlet />
    </div>
  );
};

export default MainLayout;
