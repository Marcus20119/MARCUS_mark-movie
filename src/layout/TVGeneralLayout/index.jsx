import { Outlet } from 'react-router-dom';
import Navbar from '~/components/Navbar';
import NavSection from '~/components/NavSection';

const navList = [
  {
    name: 'On The Air',
    path: '/tv/general/on-the-air?page=1',
  },
  {
    name: 'Airing Today',
    path: '/tv/general/airing-today?page=1',
  },
  {
    name: 'Search',
    path: '/tv/general/search',
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
