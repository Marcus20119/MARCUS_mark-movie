import { Outlet } from 'react-router-dom';
import Navbar from '~/components/Navbar';
import NavSection from '~/components/NavSection';

const navList = [
  {
    name: 'Now Playing',
    path: '/movie/general/now-playing?page=1',
  },
  {
    name: 'Upcoming',
    path: '/movie/general/upcoming?page=1',
  },
  {
    name: 'Search',
    path: '/movie/general/search',
  },
];

const MovieGeneralLayout = () => {
  return (
    <div className="sub-layout">
      <NavSection />
      <div className="bg-[#222222] py-[20px] px-10  overflow-hidden">
        <Navbar navList={navList} />
        <Outlet />
      </div>
    </div>
  );
};

export default MovieGeneralLayout;
