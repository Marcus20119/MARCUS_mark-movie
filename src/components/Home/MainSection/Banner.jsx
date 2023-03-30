import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

import './Banner.scss';
import { useMySWR, useResponsive } from '~/hooks';
import { ButtonPlay, ButtonPlus } from '~/components/Button';
import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import LoadingSkeleton from '~/components/Base/Loading/Skeleton';
import { api, genres, neededSignInAlert, route } from '~/utils';
import { MovieTagList, LoadingMovieTagList } from '~/components/CardAndList';
import PlusDropDownBanner from './PlusDropDownBanner';
import { useAuth } from '~/contexts/authContext';
import { ProgressiveImgOriginal } from '../../Base/ProgressiveImg';
import { Fragment } from 'react';

function Banner({ apiLink, type }) {
  const { myData: movies, isLoading: moviesLoading } = useMySWR({
    api: apiLink,
    max: 5,
  });
  let neededGenres;
  switch (type) {
    case 'movie':
      neededGenres = genres.movie;
      break;
    case 'tv': {
      neededGenres = genres.tv;
      break;
    }
    default:
      break;
  }

  const { session, handleShowModelLogIn } = useAuth();

  const { isMobile } = useResponsive();

  return (
    <div
      className={`banner w-full my-4 rounded-xl overflow-hidden shadow-[0_50px_100px_rgb(255,_61,_113,_0.1)] ${
        !isMobile ? 'h-[350px]' : 'h-[210px] imgMobile'
      }`}
    >
      {!moviesLoading && movies && movies.length > 0 && (
        <Carousel
          fade
          nextIcon={
            <i className="bx bx-chevron-right flex justify-center items-center w-[45px] h-[45px] text-4xl bg-slate-700 bg-opacity-60 rounded-full"></i>
          }
          interval={4000}
        >
          {movies.map(movie => (
            <Carousel.Item key={`banner${movie.id}`}>
              {movie?.backdrop_path ? (
                <ProgressiveImgOriginal
                  className="carousel-item__img"
                  src={api.getPoster(movie.backdrop_path, 'original')}
                  placeholderSrc={api.getPoster(movie.backdrop_path, 'w300')}
                  alt={movie.backdrop_path}
                />
              ) : (
                <img
                  className="carousel-item__img"
                  src="/imgs/no-backdrop.jpg"
                  alt="no-backdrop"
                />
              )}
              <div className="carousel-item__overlay"></div>
              <Carousel.Caption>
                <h3 className="carousel-caption__name line-clamp-1">
                  {movie.title || movie.name}
                </h3>
                {!isMobile && (
                  <MovieTagList
                    movieData={movie}
                    genresData={neededGenres}
                    category={type}
                  />
                )}
                <div className="carousel-caption__wrap-btn">
                  <ButtonPlay
                    message="Watch"
                    widthType="fit"
                    className="tracking-[0.15rem]"
                    isLink={true}
                    path={route.toDetail(type, movie.id)}
                  />
                  {!isMobile && (
                    <Fragment>
                      {session?.user?.id ? (
                        <div className="group relative">
                          <ButtonPlus padding={14} iconSize={24} />
                          <PlusDropDownBanner movieData={movie} type={type} />
                        </div>
                      ) : (
                        <ButtonPlus
                          padding={14}
                          iconSize={24}
                          onClick={() =>
                            neededSignInAlert(handleShowModelLogIn)
                          }
                        />
                      )}
                    </Fragment>
                  )}
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      {(moviesLoading || movies.length === 0) && (
        <div className="relative w-full h-full text-transparent bg-transparent">
          <LoadingSkeleton className="absolute inset-0 opacity-30" />
          <div
            className={`absolute py-[20px] flex flex-col ${
              !isMobile
                ? 'left-[2.5rem] bottom-[0.5rem]'
                : 'left-[1rem] bottom-0'
            }`}
          >
            <LoadingSkeleton
              className={`rounded-lg opacity-70 ${
                !isMobile
                  ? 'w-[300px] h-[48px] mb-[16.8px] mt-[4.8px]'
                  : 'w-[200px] h-[24px] mb-[14.4px] mt-[2.4px]'
              }`}
            />
            {!isMobile && <LoadingMovieTagList />}
            <div className="carousel-caption__wrap-btn">
              <ButtonPlay
                message="Watch"
                widthType="fit"
                className="tracking-[0.15rem]"
                disabled={true}
              />
              {!isMobile && (
                <ButtonPlus padding={14} iconSize={24} disabled={true} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Banner.propTypes = {
  apiLink: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['movie', 'tv']).isRequired,
};

export default withErrorBoundary(Banner, {
  FallbackComponent: ErrorFallBack,
});
