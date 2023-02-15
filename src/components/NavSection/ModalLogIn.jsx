import { withErrorBoundary } from 'react-error-boundary';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import ModalBase from '~/components/Base/ModalBase';
import { supabase } from '~/supabase';
import { useAuth } from '~/contexts/authContext';
import { useResponsive } from '~/hooks';

const ModalLogIn = () => {
  const { showModelLogIn, handleHideModelLogIn } = useAuth();
  const { isMobile } = useResponsive();
  return (
    <ModalBase visible={showModelLogIn} onClose={handleHideModelLogIn}>
      <div
        className={`relative bg-[#181818] rounded-2xl z-2 transition-all float-border ${
          !isMobile ? 'w-[450px] px-12 py-[40px]' : 'w-[380px] px-8 py-[32px]'
        }`}
      >
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
