import { useState, useEffect } from 'react';
import Avatar from '~/pages/User/Avatar';
import { useAuth } from '~/contexts/authContext';
import { supabase } from '~/supabase';
import { Fragment } from 'react';

const UserInfoPage = () => {
  const [loading, setLoading] = useState(false);

  const { session, userRow, handleForceGetUserRow } = useAuth();

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
          <div
            aria-live="polite"
            className="flex justify-center items-center w-full "
          >
            <Avatar
              url={userRow.avatar_url}
              size={250}
              onUpload={url => {
                const newData = { ...userRow, avatar_url: url };
                handleForceGetUserRow();
                updateProfile(newData);
              }}
            />
            {/* <div>Email: {newUserRow.email}</div> */}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserInfoPage;
