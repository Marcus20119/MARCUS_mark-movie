import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { useModal } from '~/hooks';
import { supabase } from '../supabase';

const AuthContext = createContext();

const AuthProvider = props => {
  // Xử lý logic ẩn hiện portal login
  const {
    show: showModelLogIn,
    handleShow: handleShowModelLogIn,
    handleHide: handleHideModelLogIn,
  } = useModal();

  // Xử lý authentication
  const [session, setSession] = useState({});

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      handleHideModelLogIn();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const value = {
    userRow,
    setUserRow,
    loadingGetUserRow,
    handleForceGetUserRow,
    session,
    setSession,
    showModelLogIn,
    handleShowModelLogIn,
    handleHideModelLogIn,
  };
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
};

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === 'undefined') {
    throw new Error('useAuth must be used within AuthContext');
  }
  const {
    userRow,
    setUserRow,
    loadingGetUserRow,
    handleForceGetUserRow,
    session,
    setSession,
    showModelLogIn,
    handleShowModelLogIn,
    handleHideModelLogIn,
  } = context;
  return {
    userRow,
    setUserRow,
    loadingGetUserRow,
    handleForceGetUserRow,
    session,
    setSession,
    showModelLogIn,
    handleShowModelLogIn,
    handleHideModelLogIn,
  };
}

export default AuthProvider;
export { useAuth };
