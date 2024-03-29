import { useEffect, useState, useContext, createContext } from 'react';
import { useModal } from '~/hooks';
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

  // Lấy dữ liệu like và dislike
  const [forceGetLikes, setForceGetLikes] = useState(false);
  const handleForceGetLikes = () => {
    setForceGetLikes(!forceGetLikes);
  };
  const { tableData: likesTable, loading: loadingLikesTable } =
    useFetchAllTable({
      table: 'likes',
      neededLogIn: true,
      match: { user_id: userRow.id },
      rerenderCondition: [forceGetLikes, userRow],
      initialLoading: true,
    });

  // Xử lý ẩn hiện modal Edit User Info
  const {
    show: showModelEditInfo,
    handleShow: handleShowModelEditInfo,
    handleHide: handleHideModelEditInfo,
  } = useModal();

  const value = {
    userRow,
    setUserRow,
    loadingGetUserRow,
    handleForceGetUserRow,
    avatarUrl,
    setAvatarUrl,
    likesTable,
    loadingLikesTable,
    handleForceGetLikes,
    showModelEditInfo,
    handleShowModelEditInfo,
    handleHideModelEditInfo,
  };
  return <UserContext.Provider value={value} {...props}></UserContext.Provider>;
};

function useUser() {
  const context = useContext(UserContext);
  if (typeof context === 'undefined') {
    throw new Error('useUser must be used within UserContext');
  }
  const {
    userRow,
    setUserRow,
    loadingGetUserRow,
    handleForceGetUserRow,
    avatarUrl,
    setAvatarUrl,
    likesTable,
    loadingLikesTable,
    handleForceGetLikes,
    showModelEditInfo,
    handleShowModelEditInfo,
    handleHideModelEditInfo,
  } = context;
  return {
    userRow,
    setUserRow,
    loadingGetUserRow,
    handleForceGetUserRow,
    avatarUrl,
    setAvatarUrl,
    likesTable,
    loadingLikesTable,
    handleForceGetLikes,
    showModelEditInfo,
    handleShowModelEditInfo,
    handleHideModelEditInfo,
  };
}

export default UserProvider;
export { useUser };
