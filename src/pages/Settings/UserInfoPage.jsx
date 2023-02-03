import { useState, useEffect } from 'react';
import Avatar from '~/pages/User/Avatar';
import { useAuth } from '~/contexts/authContext';
import { supabase } from '~/supabase';
import { InputBar, Navbar } from '~/components/Bar';
import { navTV } from '~/utils';
import { ButtonPrimary } from '~/components/Button';
import { Fragment } from 'react';
import { useUser } from '~/contexts/userContext';

const UserInfoPage = () => {
  const [loading, setLoading] = useState(false);

  const { session } = useAuth();
  const { userRow } = useUser();
  const [newUserRow, setNewUserRow] = useState({});
  useEffect(() => {
    if (userRow) {
      setNewUserRow({ ...userRow });
    }
  }, [userRow]);

  const updateProfile = async () => {
    try {
      setLoading(true);
      console.log('newUserRow', newUserRow);

      let { error } = await supabase.from('profiles').upsert({
        ...newUserRow,
        updated_at: new Date(),
      });

      if (error) {
        console.error(error);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {newUserRow.email && (
        <div className="!bg-mainSection py-[20px] px-10  overflow-hidden !text-white">
          <Navbar navList={navTV} />
          <div>
            <div
              aria-live="polite"
              className="flex justify-center items-center w-full "
            >
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateProfile();
                }}
                className="flex flex-col justify-center items-center"
              >
                <Avatar
                  url={newUserRow.avatar_url}
                  size={250}
                  onUpload={url => {
                    setNewUserRow(prev => {
                      return { ...prev, avatar_url: url };
                    });
                  }}
                />
                <div>Email: {session.user.email}</div>
                <InputBar
                  name="username"
                  label="User Name"
                  value={newUserRow.username}
                  setValue={setNewUserRow}
                />
                <InputBar
                  name="website"
                  label="Website"
                  value={newUserRow.website}
                  setValue={setNewUserRow}
                  type="url"
                />
                <div>
                  <ButtonPrimary disabled={loading} onClick={updateProfile}>
                    Update profile
                  </ButtonPrimary>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserInfoPage;
