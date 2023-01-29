import { useState, useEffect } from 'react';
import Avatar from '~/pages/User/Avatar';
import { useAuth } from '~/contexts/authContext';
import { supabase } from '~/supabase';
import { Fragment } from 'react';
import Wallpaper from './Wallpaper';
import { useScrollOnTop } from '~/hooks';
import MainInfoSection from './MainInfoSection';
import { useUser } from '~/contexts/userContext';

const UserInfoPage = () => {
  useScrollOnTop();
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

            <div className="absolute top-[280px] left-0 w-full z-10 px-[28px]">
              <div className="flex items-end gap-3">
                <Avatar
                  url={userRow.avatar_url}
                  onUpload={url => {
                    const newData = { ...userRow, avatar_url: url };
                    handleForceGetUserRow();
                    updateProfile(newData);
                  }}
                />
                <div>
                  <MainInfoSection userRow={userRow} />
                </div>
              </div>
            </div>
            {/* <div>Email: {newUserRow.email}</div> */}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserInfoPage;
