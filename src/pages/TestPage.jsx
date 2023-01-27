import { useEffect, useState } from 'react';
import { supabase } from '~/supabase';
import Account from '~/Account';
import Auth from '~/Auth';
const TestPage = () => {
  const [session, setSession] = useState(null);
  // console.log('session', session);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    console.log('session', session);

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
};

export default TestPage;
