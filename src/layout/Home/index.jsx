import { Outlet } from 'react-router-dom';

import MainSection from '../../components/MainSection';
import NavSection from '../../components/NavSection';
import SearchSection from '../../components/SearchSection';

const Home = () => {
  return (
    <div className="app-layout">
      <NavSection />

      <MainSection>
        <Outlet />
      </MainSection>

      <SearchSection />
    </div>
  );
};

export default Home;
