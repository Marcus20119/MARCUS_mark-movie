import { useEffect } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

import ErrorFallBack from '~/components/Base/ErrorFallBack';
import AvatarSection from '~/components/Detail/Person/AvatarSection';
import { api } from '~/config';
import useMySWR from '~/hooks/useMySWR';

const CelebDetailPage = () => {
  const { id } = useParams();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [id]);

  const { myData: personData, isLoading: personLoading } = useMySWR({
    api: api.getDetail(id, 'person'),
  });

  return (
    <div className="flex w-full justify-between items-start gap-[20px] p-[40px]">
      {!personLoading && personData.name && (
        <AvatarSection personData={personData} />
      )}
    </div>
  );
};

export default withErrorBoundary(CelebDetailPage, {
  FallbackComponent: ErrorFallBack,
});
