import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';

import MovieCardY from '../CardY';
import NextBtn from '~/components/Base/Swiper/NextBtn';
import PrevBtn from '~/components/Base/Swiper/PrevBtn';

const MovieCardListY = ({ moviesData, type }) => {
  const nextRef = useRef();
  const prevRef = useRef();
  return (
    <div className="relative">
      <Swiper grabCursor spaceBetween={10} slidesPerView="auto">
        {moviesData &&
          moviesData.length &&
          moviesData.length > 0 &&
          moviesData.map(movieData => (
            <SwiperSlide key={movieData.id}>
              <MovieCardY movieData={movieData} type={type} />
            </SwiperSlide>
          ))}
        <NextBtn ref={nextRef} />
        <PrevBtn ref={prevRef} />
      </Swiper>
      <div className="absolute -top-11 right-0 inline-flex justify-center gap-2">
        <button
          className="flex justify-center items-center w-7 h-7 bg-[rgba(255,_255,_255,_0.3)] rounded-full text-white text-xl opacity-70 hover:opacity-100"
          onClick={() => {
            prevRef.current.click();
          }}
        >
          <i className="bx bx-chevron-left"></i>
        </button>
        <button
          className="flex justify-center items-center w-7 h-7 bg-[rgba(255,_255,_255,_0.3)] rounded-full text-white text-xl opacity-70 hover:opacity-100"
          onClick={() => {
            nextRef.current.click();
          }}
        >
          <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

MovieCardListY.propTypes = {
  moviesData: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['movie', 'tv']).isRequired,
};

export default MovieCardListY;
