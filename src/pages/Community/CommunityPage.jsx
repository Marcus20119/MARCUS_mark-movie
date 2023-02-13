import LoadingBounce from '~/components/Base/Loading/Bounce';
import { useUser } from '~/contexts/userContext';
import { useChangeTitleWebsite, useScrollOnTop } from '~/hooks';
import { useFetchAllTableInfinity } from '~/supabase/useFetchAllTableInfinity';
import CommunityStatus from './CommunityStatus';

const CommunityPage = () => {
  useChangeTitleWebsite({ title: 'Mark Movie - Community' });
  useScrollOnTop();
  const { likesTable, loadingLikesTable } = useUser();
  const { tableData, loading } = useFetchAllTableInfinity({
    table: 'statuses',
    initialLoading: true,
    rowPerLoad: 10,
    limit: 20,
    neededLogIn: true,
  });

  return (
    <div className="w-full bg-[#181818] px-[30px] pt-[30px] pb-[42px]">
      {!!tableData && tableData.length > 0 && (
        <div className="grid grid-cols-3 gap-[30px]">
          {Array(3)
            .fill('')
            .map((item, indexCol) => (
              <div
                key={`community-col-${indexCol}`}
                className="flex flex-col gap-[30px]"
              >
                {tableData.map(
                  (status, indexStatus) =>
                    indexStatus % 3 === indexCol && (
                      <CommunityStatus
                        key={`communityStatus-${indexCol}-${indexStatus}`}
                        status={status}
                        likesTable={likesTable}
                        loadingLikesTable={loadingLikesTable}
                      />
                    )
                )}
              </div>
            ))}
        </div>
      )}
      {loading && (
        <div className="mx-auto w-full">
          <LoadingBounce />
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
