import { Outlet } from 'react-router-dom';
import { NavSection } from '~/components/NavSection';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <NavSection />
      <Outlet />
    </div>
  );
};

export default MainLayout;
