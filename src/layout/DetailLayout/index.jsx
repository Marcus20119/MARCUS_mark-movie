import { Outlet } from 'react-router-dom';
import NavSection from '~/components/NavSection';

const DetailLayout = () => {
  return (
    <div className="sub-layout">
      <NavSection />
      <div className="relative bg-[#222222] min-h-[100vh] border-x-[1px] border-x-[#353338] overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default DetailLayout;
