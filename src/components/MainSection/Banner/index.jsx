import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

import './Banner.scss';
import ErrorFallBack from '../../Base/ErrorFallBack';
import useMySWR from '../../../hooks/useMySWR';
import ButtonPlay from '../../Common/Button/Play';
import ButtonPlus from '../../Common/Button/Plus';
import LoadingSkeleton from '../../Base/Loading/Skeleton';

function Banner({ apiLink, apiGenres }) {
  const { myData: catagories, isLoading: catagoriesLoading } = useMySWR({
    api: apiGenres,
  });
  const { myData: movies, isLoading: moviesLoading } = useMySWR({
    api: apiLink,
    max: 5,
  });
  return (
    <div className="banner w-full h-[350px] my-4 rounded-xl overflow-hidden shadow-[0_50px_100px_rgb(255,_61,_113,_0.1)]">
      {!catagoriesLoading &&
        !moviesLoading &&
        catagories &&
        movies &&
        movies.length > 0 && (
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
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title || movie.name}
                />
                <div className="carousel-item__overlay"></div>
                <Carousel.Caption>
                  <h3 className="carousel-caption__name line-clamp-1">
                    {movie.title || movie.name}
                  </h3>
                  <div className="carousel-caption__tag-wrap">
                    {movie.genre_ids &&
                      movie.genre_ids.map(id => (
                        <button
                          key={`genres${id}`}
                          className="carousel-caption__tag"
                        >
                          {catagories.find(
                            catagories => catagories.id === id
                          ) &&
                            catagories.find(catagories => catagories.id === id)
                              .name}
                        </button>
                      ))}
                  </div>
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
      {(catagoriesLoading || moviesLoading || movies.length === 0) && (
        <div className="relative w-full h-full text-transparent bg-transparent">
          <LoadingSkeleton className="absolute inset-0 opacity-30" />
          <div className="absolute left-[2.5rem] bottom-[0.5rem] py-[20px] flex flex-col">
            <LoadingSkeleton className="w-[400px] h-[57.6px] mb-[12px] rounded-lg" />
            <div className="carousel-caption__tag-wrap">
              {['Horror', 'Romantic', 'Science Fiction'].map(item => (
                <button
                  key={`loadingGenres${item}`}
                  className="carousel-caption__tag"
                >
                  {item}
                </button>
              ))}
            </div>
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
};

export default withErrorBoundary(Banner, {
  FallbackComponent: ErrorFallBack,
});
