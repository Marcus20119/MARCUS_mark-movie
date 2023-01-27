import { Outlet } from 'react-router-dom';
import { NavSection } from '~/components/NavSection';

const MainLayout = () => {
  return (
    <div className="main-layout min-h-[120vh]">
      <NavSection />
      <Outlet />
    </div>
  );
};

export default MainLayout;
