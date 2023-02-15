import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';

import MovieCardY from './MovieCardY';
import NextBtn from '~/components/Base/Swiper/NextBtn';
import PrevBtn from '~/components/Base/Swiper/PrevBtn';
import { useResponsive } from '~/hooks';
import FilmCard from './FilmCard';

const MovieCardListY = ({ moviesData, type }) => {
  const nextRef = useRef();
  const prevRef = useRef();
  const { isMobile, isTablet, isLaptop } = useResponsive();
  return (
    <div className="relative">
      <Swiper spaceBetween={10} slidesPerView="auto" grabCursor>
        {moviesData &&
          moviesData.length &&
          moviesData.length > 0 &&
          moviesData.map(movieData => (
            <SwiperSlide key={movieData.id}>
              {!isMobile ? (
                <MovieCardY movieData={movieData} type={type} />
              ) : (
                <FilmCard type={type} filmData={movieData} />
              )}
            </SwiperSlide>
          ))}
        <NextBtn ref={nextRef} />
        <PrevBtn ref={prevRef} />
      </Swiper>
      {!isMobile && (
        <div
          className={`absolute right-0 inline-flex justify-center ${
            isLaptop && '-top-11 gap-2'
          } ${isTablet && '-top-12 gap-[10px]'}`}
        >
          <button
            className={`flex justify-center items-center bg-[rgba(255,_255,_255,_0.3)] rounded-full text-white text-xl opacity-70 hover:opacity-100 ${
              isLaptop && 'w-7 h-7'
            } ${isTablet && 'w-9 h-9'}`}
            onClick={() => {
              prevRef.current.click();
            }}
          >
            <i className="bx bx-chevron-left"></i>
          </button>
          <button
            className={`flex justify-center items-center bg-[rgba(255,_255,_255,_0.3)] rounded-full text-white text-xl opacity-70 hover:opacity-100 ${
              isLaptop && 'w-7 h-7'
            } ${isTablet && 'w-9 h-9'}`}
            onClick={() => {
              nextRef.current.click();
            }}
          >
            <i className="bx bx-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

MovieCardListY.propTypes = {
  moviesData: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['movie', 'tv']).isRequired,
};

export { MovieCardListY };
