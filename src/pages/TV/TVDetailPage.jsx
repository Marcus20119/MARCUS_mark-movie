import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';

import { api } from '~/utils';
import { useChangeTitleWebsite, useMySWR, useScrollOnTop } from '~/hooks';

import {
  DetailBackdrop,
  DetailCastSection,
  DetailContentSection,
  DetailPosterSection,
  DetailSeasonSection,
  DetailTrailerSection,
  LoadingPosterSection,
} from '~/components/Detail';
import './TVDetailPage.scss';
import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import LoadingContentSection from '~/components/Detail/LoadingContentSection';
import LoadingBackdrop from '~/components/Detail/LoadingBackdrop';

const TVDetailPage = () => {
  const { id } = useParams();
  useScrollOnTop(id);

  const { myData: movieData, isLoading: movieLoading } = useMySWR({
    api: api.getDetail(id, 'tv'),
  });
  const { myData: creditsData, isLoading: creditsLoading } = useMySWR({
    api: api.getMovieCredits(id, 'tv'),
  });
  const { myData: videosData, isLoading: videosLoading } = useMySWR({
    api: api.getTrailer(id, 'tv'),
  });

  useChangeTitleWebsite({
    title: movieData?.name ? movieData.name : '',
    rerenderCondition: [movieData],
  });

  return (
    <div className="relative !bg-mainSection min-h-[150vh] ">
      {!movieLoading && !Array.isArray(movieData) && (
        <Fragment>
          <DetailBackdrop movieData={movieData} type="tv" />
          <div className="absolute top-[250px] right-0 left-0 z-10">
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
      {movieLoading && (
        <Fragment>
          <LoadingBackdrop />
          <div className="absolute top-[250px] right-0 left-0">
            <div className="flex w-full items-start justify-between gap-5 px-[40px]">
              <LoadingPosterSection />
              <LoadingContentSection />
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default withErrorBoundary(TVDetailPage, {
  FallbackComponent: ErrorFallBack,
});
