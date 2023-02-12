import { withErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import { MainList } from '~/components/CardAndList';
import { DetailCelebInfoSection } from '~/components/Detail';
import { api } from '~/utils';
import { useChangeTitleWebsite, useMySWR, useScrollOnTop } from '~/hooks';
import { Fragment } from 'react';
import LoadingCelebInfoSection from '~/components/Detail/LoadingCelebInfoSection';

const PersonDetailPage = () => {
  const { id } = useParams();

  useScrollOnTop(id);

  const { myData: personData, isLoading: personLoading } = useMySWR({
    api: api.getDetail(id, 'person'),
  });

  const { myData: movieCreditsData, isLoading: movieCreditLoading } = useMySWR({
    api: api.getPersonCredits(id, 'movie'),
  });
  const { myData: tvCreditsData, isLoading: tvCreditLoading } = useMySWR({
    api: api.getPersonCredits(id, 'tv'),
  });

  useChangeTitleWebsite({
    title: personData?.name ? personData.name : '',
    rerenderCondition: [personData],
  });

  return (
    <div>
      {!personLoading && personData.name && (
        <Fragment>
          <DetailCelebInfoSection personData={personData} />
          <div className="flex flex-col">
            {!movieCreditLoading &&
              movieCreditsData?.cast &&
              movieCreditsData.cast.length > 0 && (
                <div className="relative w-full p-[30px] !bg-mainSection">
                  <h3 className="text-2xl text-white font-bold mb-[24px]">
                    {`${personData.name}${
                      personData.name.slice(-1) === 's' ? "'" : "'s"
                    } Movies`}
                  </h3>
                  <MainList
                    listData={movieCreditsData.cast}
                    numberOfCol={5}
                    type="movie"
                  />
                </div>
              )}
            {!tvCreditLoading &&
              tvCreditsData?.cast &&
              tvCreditsData.cast.length > 0 && (
                <div className="relative w-full p-[30px] !bg-mainSection">
                  <h3 className="text-2xl text-white font-bold mb-[24px]">
                    {`${personData.name}${
                      personData.name.slice(-1) === 's' ? "'" : "'s"
                    } TV Shows`}
                  </h3>
                  <MainList
                    listData={tvCreditsData.cast}
                    numberOfCol={5}
                    type="tv"
                  />
                </div>
              )}
          </div>
        </Fragment>
      )}
      {personLoading && <LoadingCelebInfoSection />}
    </div>
  );
};

export default withErrorBoundary(PersonDetailPage, {
  FallbackComponent: ErrorFallBack,
});
