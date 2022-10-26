import { Swiper, SwiperSlide } from 'swiper/react';

import LoadingCardY from './LoadingCardY';

const MovieLoadingCardListY = () => {
  return (
    <div className="relative">
      <Swiper grabCursor spaceBetween={10} slidesPerView="auto">
        {Array(6)
          .fill('')
          .map((item, index) => (
            <SwiperSlide key={`loadingCardY${index}`}>
              <LoadingCardY />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="absolute -top-11 right-0 inline-flex justify-center gap-2">
        <button
          className="flex justify-center items-center w-7 h-7 bg-[rgba(255,_255,_255,_0.3)] rounded-full text-white text-xl opacity-70"
          disabled
        >
          <i className="bx bx-chevron-left"></i>
        </button>
        <button
          className="flex justify-center items-center w-7 h-7 bg-[rgba(255,_255,_255,_0.3)] rounded-full text-white text-xl opacity-70"
          disabled
        >
          <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default MovieLoadingCardListY;
