import { withErrorBoundary } from 'react-error-boundary';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import ModalBase from '~/components/Base/ModalBase';
import { useModal } from '~/hooks';
import { supabase } from '~/supabase';
import { useEffect } from 'react';
import { useAuth } from '~/contexts/authContext';

const ModalLogIn = () => {
  const { showModelLogIn, handleHideModelLogIn } = useAuth();
  return (
    <ModalBase visible={showModelLogIn} onClose={handleHideModelLogIn}>
      <div className="relative w-[450px] bg-[#181818] px-12 py-[40px] rounded-2xl z-2 transition-all float-border">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['github', 'google', 'discord']}
        />
        <button
          className="close-modal absolute top-0 right-6 text-[1.75rem] hover:opacity-70"
          onClick={handleHideModelLogIn}
        ></button>
      </div>
    </ModalBase>
  );
};

export default withErrorBoundary(ModalLogIn, {
  FallbackComponent: ErrorFallBack,
});
