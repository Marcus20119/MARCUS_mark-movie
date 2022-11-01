import { Outlet } from 'react-router-dom';
import NavSection from '~/components/NavSection';

const DetailLayout = () => {
  return (
    <div className="sub-layout">
      <NavSection />
      <Outlet />
    </div>
  );
};

export default DetailLayout;
