import { Outlet } from 'react-router-dom';
import { NavSection } from '~/components/NavSection';
// import { useUser } from '~/contexts/userContext';

const MainLayout = () => {
  // const { userRow, loadingGetUserRow } = useUser();
  return (
    <div className="main-layout min-h-[120vh]">
      <NavSection />
      <Outlet />
      {/* {!loadingGetUserRow && (
        <Outlet
          context={{
            userRow,
          }}
        />
      )} */}
    </div>
  );
};

export default MainLayout;
