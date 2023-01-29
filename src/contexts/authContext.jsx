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

  const value = {
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
    session,
    setSession,
    showModelLogIn,
    handleShowModelLogIn,
    handleHideModelLogIn,
  } = context;
  return {
    session,
    setSession,
    showModelLogIn,
    handleShowModelLogIn,
    handleHideModelLogIn,
  };
}

export default AuthProvider;
export { useAuth };
