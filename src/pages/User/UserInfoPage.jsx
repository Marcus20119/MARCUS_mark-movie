import { useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import Avatar from '~/pages/User/Avatar';
import { supabase, useFetchAllTable } from '~/supabase';
import Wallpaper from './Wallpaper';
import { useChangeTitleWebsite, useResponsive, useScrollOnTop } from '~/hooks';
import SectionMainInfo from './SectionMainInfo';
import { useUser } from '~/contexts/userContext';
import { ButtonPrimary } from '~/components/Button';
import SectionTab from './SectionTab';
import { errorToast } from '~/utils';
import ModalEditInfo from './ModalEditInfo';
import { useAuth } from '~/contexts/authContext';

const UserInfoPage = () => {
  useChangeTitleWebsite({ title: 'Mark Movie - User' });
  const { session } = useAuth();
  const { userRow, handleForceGetUserRow, handleShowModelEditInfo } = useUser();
  const { search } = useLocation();
  const section = search.split('=')[1];

  const { isMobile, isLaptop } = useResponsive();

  useScrollOnTop(section, !isMobile ? 178 : 150);

  const updateProfile = async newUserRow => {
    try {
      let { error } = await supabase.from('profiles').upsert({
        ...newUserRow,
        updated_at: new Date(),
      });

      if (error) {
        errorToast('Error: ', error.message);
        console.error(error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Lấy danh sách favorite actors
  const {
    tableData: favoriteActorsTable,
    loading: loadingFavoriteActorsTable,
  } = useFetchAllTable({
    table: 'favorite_actors',
    neededLogIn: true,
    match: { user_id: session?.user?.id ? session.user.id : '' },
    rerenderCondition: [session],
    initialLoading: true,
  });

  return (
    <Fragment>
      {userRow?.email && (
        <div>
          <div aria-live="polite" className="relative w-full">
            <Wallpaper
              url={userRow.wallpaper_url}
              onUpload={url => {
                const newData = { ...userRow, wallpaper_url: url };
                handleForceGetUserRow();
                updateProfile(newData);
              }}
            />

            <div
              className={`absolute left-0 w-full z-10 ${
                !isMobile ? 'top-[300px]' : 'top-[170px]'
              }`}
            >
              <div
                className={`flex items-end gap-3  ${
                  !isMobile ? 'px-[60px]' : 'flex-col px-[16px]'
                }`}
              >
                <Avatar
                  url={userRow.avatar_url}
                  onUpload={url => {
                    const newData = { ...userRow, avatar_url: url };
                    handleForceGetUserRow();
                    updateProfile(newData);
                  }}
                />
                <div className={!isMobile ? 'max-w-[60%]' : 'w-full'}>
                  <SectionMainInfo
                    userRow={userRow}
                    favoriteActorsTable={favoriteActorsTable}
                    loadingFavoriteActorsTable={loadingFavoriteActorsTable}
                  />
                </div>
                {isLaptop && (
                  <div className="ml-auto mb-[16px]">
                    <ButtonPrimary
                      className="px-3 py-2 rounded-lg font-normal"
                      onClick={handleShowModelEditInfo}
                    >
                      <i className="bx bxs-edit-alt"></i>
                      <span>Edit Info</span>
                    </ButtonPrimary>
                  </div>
                )}
              </div>
              <SectionTab section={section} userRow={userRow} />
            </div>
          </div>
        </div>
      )}
      <ModalEditInfo />
    </Fragment>
  );
};

export default UserInfoPage;
