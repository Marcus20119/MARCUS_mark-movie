import { useEffect } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

import ErrorFallBack from '~/components/Base/ErrorFallBack';
import FilmList from '~/components/CardAndList/FilmList';
import DetailCelebInfoSection from '~/components/Detail/CelebInfoSection';
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

  const { myData: movieCreditsData, isLoading: movieCreditLoading } = useMySWR({
    api: api.getPersonCredits(id, 'movie'),
  });
  const { myData: tvCreditsData, isLoading: tvCreditLoading } = useMySWR({
    api: api.getPersonCredits(id, 'tv'),
  });

  return (
    <div>
      <div className="flex w-full justify-between items-start gap-[28px] bg-[#222222] p-[40px]">
        {!personLoading && personData.name && (
          <DetailCelebInfoSection personData={personData} />
        )}
      </div>
      <div className="flex flex-col">
        {!movieCreditLoading &&
          movieCreditsData?.cast &&
          movieCreditsData.cast.length > 0 && (
            <div className="relative w-full p-[30px] bg-[#222222]">
              <h3 className="text-2xl text-white font-bold mb-[24px]">
                {`${personData.name} Movies`}
              </h3>
              <FilmList
                filmsData={movieCreditsData.cast}
                numberOfCol={5}
                type="movie"
              />
            </div>
          )}
        {!tvCreditLoading &&
          tvCreditsData?.cast &&
          tvCreditsData.cast.length > 0 && (
            <div className="relative w-full p-[30px] bg-[#222222]">
              <h3 className="text-2xl text-white font-bold mb-[24px]">
                {`${personData.name} TV Shows`}
              </h3>
              <FilmList
                filmsData={tvCreditsData.cast}
                numberOfCol={5}
                type="tv"
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default withErrorBoundary(CelebDetailPage, {
  FallbackComponent: ErrorFallBack,
});
