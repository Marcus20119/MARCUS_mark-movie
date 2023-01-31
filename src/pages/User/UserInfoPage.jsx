import { useState, useEffect } from 'react';
import Avatar from '~/pages/User/Avatar';
import { useAuth } from '~/contexts/authContext';
import { supabase } from '~/supabase';
import { Fragment } from 'react';
import Wallpaper from './Wallpaper';
import { useScrollOnTop } from '~/hooks';
import SectionMainInfo from './SectionMainInfo';
import { useUser } from '~/contexts/userContext';
import { ButtonPrimary } from '~/components/Button';
import { useLocation } from 'react-router-dom';
import SectionTab from './SectionTab';

const UserInfoPage = () => {
  useScrollOnTop();
  const { search } = useLocation();
  const section = search.split('=')[1];
  console.log('section', section);

  const [loading, setLoading] = useState(false);

  const { userRow, handleForceGetUserRow } = useUser();

  const updateProfile = async newUserRow => {
    try {
      setLoading(true);

      let { error } = await supabase.from('profiles').upsert({
        ...newUserRow,
        updated_at: new Date(),
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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

            <div className="absolute top-[300px] left-0 w-full z-10">
              <div className="flex items-end gap-3 px-[60px]">
                <Avatar
                  url={userRow.avatar_url}
                  onUpload={url => {
                    const newData = { ...userRow, avatar_url: url };
                    handleForceGetUserRow();
                    updateProfile(newData);
                  }}
                />
                <div>
                  <SectionMainInfo userRow={userRow} />
                </div>
                <div className="ml-auto mb-[16px]">
                  <ButtonPrimary className="px-3 py-2 rounded-lg font-normal">
                    <i class="bx bxs-edit-alt"></i>
                    <span>Edit Info</span>
                  </ButtonPrimary>
                </div>
              </div>
              <SectionTab section={section} />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserInfoPage;
