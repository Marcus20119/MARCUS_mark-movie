import { useEffect, useState } from 'react';
import { supabase } from '~/supabase';
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
    <div className="container" style={{ padding: '50px 0 100px 0' }}></div>
  );
};

export default TestPage;
