import { Fragment } from 'react';
import LoadingBounce from '~/components/Base/Loading/Bounce';
import { useUser } from '~/contexts/userContext';
import { useChangeTitleWebsite, useResponsive, useScrollOnTop } from '~/hooks';
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

  const { isMobile, isTablet, isLaptop } = useResponsive();

  return (
    <div className="w-full bg-[#181818] px-[30px] pt-[30px] pb-[42px] min-h-screen">
      {!!tableData && tableData.length > 0 && (
        <Fragment>
          {isLaptop && (
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
          {isTablet && (
            <div className="grid grid-cols-2 gap-[30px]">
              {Array(2)
                .fill('')
                .map((item, indexCol) => (
                  <div
                    key={`community-col-${indexCol}`}
                    className="flex flex-col gap-[30px]"
                  >
                    {tableData.map(
                      (status, indexStatus) =>
                        indexStatus % 2 === indexCol && (
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
          {isMobile && (
            <div className="grid grid-cols-2 gap-[30px]">
              <div className="flex flex-col gap-[30px]">
                {tableData.map((status, indexStatus) => (
                  <CommunityStatus
                    key={`communityStatus-${indexStatus}`}
                    status={status}
                    likesTable={likesTable}
                    loadingLikesTable={loadingLikesTable}
                  />
                ))}
              </div>
            </div>
          )}
        </Fragment>
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
