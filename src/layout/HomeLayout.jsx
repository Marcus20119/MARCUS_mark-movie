import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingPage from '~/pages/LoadingPage';

import { NavSection } from '../components/NavSection';

const MainLayout = () => {
  return (
    <Suspense fallback={<LoadingPage isHomePage={true} />}>
      <div className="home-layout">
        <NavSection isHomePage={true} />
        <Outlet />
      </div>
    </Suspense>
  );
};

export default MainLayout;
