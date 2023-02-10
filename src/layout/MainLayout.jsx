import { Outlet } from 'react-router-dom';
import { NavSection } from '~/components/NavSection';

const MainLayout = () => {
  return (
    <div className={`min-h-[120vh] transition-none main-layout`}>
      <NavSection />
      <Outlet />
    </div>
  );
};

export default MainLayout;
