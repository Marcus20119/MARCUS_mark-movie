import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import useSWR from 'swr';
import PropTypes from 'prop-types';

import { fetcher } from '../../../config/configSWR';
import './Banner.scss';

function Banner({ apiLink }) {
  const [catagories, setCatagories] = useState([]);
  const [movies, setMovies] = useState([]);
  const { data: categoriesData, error: categoriesError } = useSWR(
    'http://api.themoviedb.org/3/genre/movie/list?api_key=ca5bec6407d971b84c656385ba10351d',
    fetcher
  );
  const { data: moviesData, error: moviesError } = useSWR(apiLink, fetcher);
  useEffect(() => {
    if (categoriesData && categoriesData.genres) {
      setCatagories(categoriesData.genres);
    }
  }, [categoriesData]);
  useEffect(() => {
    if (moviesData && moviesData.results) {
      setMovies(moviesData.results.slice(0, 5));
    }
  }, [moviesData]);
  return (
    <div className="banner w-full h-[350px] my-4 rounded-xl overflow-hidden shadow-[0_50px_100px_rgb(255,_61,_113,_0.1)]">
      <Carousel
        fade
        nextIcon={
          <i className="bx bx-chevron-right flex justify-center items-center w-[45px] h-[45px] text-4xl bg-slate-700 bg-opacity-60 rounded-full"></i>
        }
        interval={4000}
      >
        {/* {banners.map(banner => (
          <Carousel.Item key={banner.url}>
            <img
              className="carousel-item__img"
              src={banner.url}
              alt={banner.name}
            />
            <div className="carousel-item__overlay"></div>
            <Carousel.Caption>
              <h3 className="carousel-caption__name line-clamp-1">
                {banner.name}
              </h3>
              <div className="carousel-caption__tag-wrap">
                {banner.tags.map(tag => (
                  <button key={tag} className="carousel-caption__tag">
                    {tag}
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
        ))} */}
        {movies.map(movie => (
          <Carousel.Item key={`banner${movie.id}`}>
            <img
              className="carousel-item__img"
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
            />
            <div className="carousel-item__overlay"></div>
            <Carousel.Caption>
              <h3 className="carousel-caption__name line-clamp-1">
                {movie.title}
              </h3>
              <div className="carousel-caption__tag-wrap">
                {movie.genre_ids.map(id => (
                  <button key={`genres${id}`} className="carousel-caption__tag">
                    {catagories.find(catagories => catagories.id === id).name}
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

export default Banner;
