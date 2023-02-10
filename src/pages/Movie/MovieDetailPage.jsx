import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';

import { api } from '~/utils';
import { useChangeTitleWebsite, useMySWR, useScrollOnTop } from '~/hooks';
import {
  DetailBackdrop,
  DetailCastSection,
  DetailContentSection,
  DetailPosterMovieSection,
  DetailRecommendSection,
  DetailTrailerSection,
  LoadingPosterSection,
} from '~/components/Detail';
import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import './MovieDetailPage.scss';
import LoadingBackdrop from '~/components/Detail/LoadingBackdrop';
import LoadingContentSection from '~/components/Detail/LoadingContentSection';

const MovieDetailPage = () => {
  const { id } = useParams();
  useScrollOnTop(id);

  const { myData: movieData, isLoading: movieLoading } = useMySWR({
    api: api.getDetail(id, 'movie'),
  });
  const { myData: creditsData, isLoading: creditsLoading } = useMySWR({
    api: api.getMovieCredits(id, 'movie'),
  });
  const { myData: videosData, isLoading: videosLoading } = useMySWR({
    api: api.getTrailer(id, 'movie'),
  });
  const { myData: recommendsData, isLoading: recommendsLoading } = useMySWR({
    api: api.getRecommend(id, 'movie'),
    max: 20,
  });

  useChangeTitleWebsite({
    title: movieData?.title ? movieData.title : '',
    rerenderCondition: [movieData],
  });

  return (
    <div className="relative !bg-mainSection min-h-[150vh] ">
      {!movieLoading && !Array.isArray(movieData) && (
        <Fragment>
          <DetailBackdrop movieData={movieData} />
          <div className="absolute top-[250px] right-0 left-0 z-10">
            <div className="flex w-full items-start justify-between gap-5 px-[40px]">
              <DetailPosterMovieSection movieData={movieData} />
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
            {!recommendsLoading && recommendsData.length > 0 && (
              <DetailRecommendSection recommendsData={recommendsData} />
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

export default withErrorBoundary(MovieDetailPage, {
  FallbackComponent: ErrorFallBack,
});
