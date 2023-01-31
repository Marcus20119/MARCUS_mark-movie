import { useEffect, useState, useContext, createContext } from 'react';
import { supabase, useFetchAllTable } from '../supabase';
import { useAuth } from './authContext';

const UserContext = createContext();

const UserProvider = props => {
  const { session } = useAuth();

  // Lấy dữ liệu user
  const [userRow, setUserRow] = useState({});
  const [loadingGetUserRow, setLoadingGetUserRow] = useState(false);
  const [forceGetUserRow, setForceGetUserRow] = useState(false);

  const handleForceGetUserRow = () => {
    setForceGetUserRow(!forceGetUserRow);
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoadingGetUserRow(true);
        const { user } = session;

        let { data, error, status } = await supabase
          .from('profiles')
          .select()
          .eq('id', user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }
        if (data) {
          setUserRow(data);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoadingGetUserRow(false);
      }
    };
    if (session?.user?.id) {
      getProfile();
    }
  }, [session, forceGetUserRow]);

  // Xử lý tải xuống ảnh đại diện
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const downloadImage = async path => {
      try {
        setAvatarUrl(null);
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(path);
        if (error) {
          throw error;
        }
        const blob = URL.createObjectURL(data);
        setAvatarUrl(blob);
      } catch (error) {
        console.log('Error downloading image: ', error.message);
        return '';
      }
    };
    if (userRow?.avatar_url) {
      downloadImage(userRow.avatar_url);
      return () => URL.revokeObjectURL(avatarUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRow]);

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

  const value = {
    session,
    userRow,
    setUserRow,
    loadingGetUserRow,
    handleForceGetUserRow,
    avatarUrl,
    setAvatarUrl,
    favoriteActorsTable,
    loadingFavoriteActorsTable,
  };
  return <UserContext.Provider value={value} {...props}></UserContext.Provider>;
};

function useUser() {
  const context = useContext(UserContext);
  if (typeof context === 'undefined') {
    throw new Error('useUser must be used within UserContext');
  }
  const {
    session,
    userRow,
    setUserRow,
    loadingGetUserRow,
    handleForceGetUserRow,
    avatarUrl,
    setAvatarUrl,
    favoriteActorsTable,
    loadingFavoriteActorsTable,
  } = context;
  return {
    session,
    userRow,
    setUserRow,
    loadingGetUserRow,
    handleForceGetUserRow,
    avatarUrl,
    setAvatarUrl,

    favoriteActorsTable,
    loadingFavoriteActorsTable,
  };
}

export default UserProvider;
export { useUser };
