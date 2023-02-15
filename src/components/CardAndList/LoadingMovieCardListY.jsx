import { Swiper, SwiperSlide } from 'swiper/react';
import { useResponsive } from '~/hooks';
import LoadingSkeleton from '../Base/Loading/Skeleton';
import LoadingMovieCardY from './LoadingMovieCardY';

const LoadingMovieCardListY = () => {
  const { isMobile } = useResponsive();

  return (
    <div className="relative">
      <Swiper grabCursor spaceBetween={10} slidesPerView="auto">
        {Array(6)
          .fill('')
          .map((item, index) => (
            <SwiperSlide key={`loadingCardY${index}`}>
              {!isMobile ? (
                <LoadingMovieCardY />
              ) : (
                <div className="relative w-full h-0 pt-[145%] rounded-md overflow-hidden imgMobile opacity-70">
                  <LoadingSkeleton className="absolute top-0 left-0 w-full h-[235px]" />
                </div>
              )}
            </SwiperSlide>
          ))}
      </Swiper>
      {!isMobile && (
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
      )}
    </div>
  );
};

export { LoadingMovieCardListY };
