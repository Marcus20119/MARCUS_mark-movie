import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';

import { api } from '~/config';
import { useMySWR, useScrollOnTop } from '~/hooks';

import {
  DetailBackdrop,
  DetailCastSection,
  DetailContentSection,
  DetailPosterSection,
  DetailSeasonSection,
  DetailTrailerSection,
} from '~/components/Detail';
import './TVDetailPage.scss';
import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';

const TVDetailPage = () => {
  useScrollOnTop();
  const { id } = useParams();

  const { myData: movieData, isLoading: movieLoading } = useMySWR({
    api: api.getDetail(id, 'tv'),
  });
  const { myData: creditsData, isLoading: creditsLoading } = useMySWR({
    api: api.getMovieCredits(id, 'tv'),
  });
  const { myData: videosData, isLoading: videosLoading } = useMySWR({
    api: api.getTrailer(id, 'tv'),
  });
  return (
    <div className="relative bg-[#222222] min-h-[150vh] ">
      {!movieLoading && !Array.isArray(movieData) && (
        <Fragment>
          <DetailBackdrop movieData={movieData} type="tv" />
          <div className="absolute top-[250px] right-0 left-0">
            <div className="flex w-full items-start justify-between gap-5 px-[40px]">
              <DetailPosterSection movieData={movieData} />
              <DetailContentSection movieData={movieData} />
            </div>
            {!creditsLoading &&
              creditsData.cast &&
              creditsData.cast.length > 0 && (
                <DetailCastSection castsData={creditsData.cast} />
              )}
            {!videosLoading && videosData.length > 0 && (
              <DetailTrailerSection videosData={videosData} />
            )}
            {movieData.seasons && movieData.seasons.length > 0 && (
              <DetailSeasonSection seasonsData={movieData.seasons} />
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default withErrorBoundary(TVDetailPage, {
  FallbackComponent: ErrorFallBack,
});
