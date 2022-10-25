import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

import './Banner.scss';
import ErrorFallBack from '../../Base/ErrorFallBack';
import useMySWR from '../../../hooks/useMySWR';

function Banner({ apiLink, apiGenres }) {
  const { myData: catagories } = useMySWR({ api: apiGenres });
  const { myData: movies } = useMySWR({ api: apiLink, max: 5 });
  return (
    <div className="banner w-full h-[350px] my-4 rounded-xl overflow-hidden shadow-[0_50px_100px_rgb(255,_61,_113,_0.1)]">
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
                {movie.genre_ids.map(id => (
                  <button key={`genres${id}`} className="carousel-caption__tag">
                    {catagories.find(catagories => catagories.id === id) &&
                      catagories.find(catagories => catagories.id === id).name}
                  </button>
                ))}
              </div>
              <div className="carousel-caption__wrap-btn">
                <button className="carousel-caption__play-btn">
                  <span>Watch</span>
                  <img src="/small-round-play-button.png" alt="play-icon" />
                </button>
                <button className="carousel-caption__plus-btn">
                  <img src="/plus.png" alt="" />
                </button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

Banner.propTypes = {
  apiLink: PropTypes.string.isRequired,
};

export default withErrorBoundary(Banner, {
  FallbackComponent: ErrorFallBack,
});
