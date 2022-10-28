import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

import './Banner.scss';
import useMySWR from '~/hooks/useMySWR';
import ButtonPlay from '~/components/Common/Button/Play';
import ButtonPlus from '~/components/Common/Button/Plus';
import ErrorFallBack from '~/components/Base/ErrorFallBack';
import LoadingSkeleton from '~/components/Base/Loading/Skeleton';
import { api, genres } from '~/config';
import MovieTagList from '~/components/Common/Movie/TagList';
import MovieTagListLoading from '~/components/Common/Movie/TagList/Loading';

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
  return (
    <div className="banner w-full h-[350px] my-4 rounded-xl overflow-hidden shadow-[0_50px_100px_rgb(255,_61,_113,_0.1)]">
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
              <img
                className="carousel-item__img"
                src={api.getBackdrop(movie.backdrop_path)}
                alt={movie.title || movie.name}
              />
              <div className="carousel-item__overlay"></div>
              <Carousel.Caption>
                <h3 className="carousel-caption__name line-clamp-1">
                  {movie.title || movie.name}
                </h3>
                <MovieTagList movieData={movie} genresData={neededGenres} />
                <div className="carousel-caption__wrap-btn">
                  <ButtonPlay
                    message="Watch"
                    widthType="fit"
                    className="tracking-[0.15rem]"
                  />
                  <ButtonPlus padding={14} iconSize={24} />
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      {(moviesLoading || movies.length === 0) && (
        <div className="relative w-full h-full text-transparent bg-transparent">
          <LoadingSkeleton className="absolute inset-0 opacity-30" />
          <div className="absolute left-[2.5rem] bottom-[0.5rem] py-[20px] flex flex-col">
            <LoadingSkeleton className="w-[300px] h-[57.6px] mb-[12px] rounded-lg" />
            <MovieTagListLoading />
            <div className="carousel-caption__wrap-btn">
              <ButtonPlay
                message="Watch"
                widthType="fit"
                className="tracking-[0.15rem]"
                disabled={true}
              />
              <ButtonPlus padding={14} iconSize={24} disabled={true} />
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
