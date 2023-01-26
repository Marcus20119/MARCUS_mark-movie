import { useRef } from 'react';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import { Swiper, SwiperSlide } from 'swiper/react';

import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import NextBtn from '~/components/Base/Swiper/NextBtn';
import PrevBtn from '~/components/Base/Swiper/PrevBtn';
import TrailerItem from './TrailerItem';

const DetailTrailerSection = ({ videosData }) => {
  const keys = videosData.map(videoData => videoData.key);

  const nextRef = useRef();
  const prevRef = useRef();
  return (
    <div className="relative w-full p-[30px] bg-[#222222]">
      <h3 className="text-2xl text-white font-bold mb-3">Trailers & Videos</h3>
      <Swiper spaceBetween={16} slidesPerView="auto" className="detail-trailer">
        {keys &&
          keys.length &&
          keys.length > 0 &&
          keys.slice(0, 20).map((key, index) => {
            return (
              <SwiperSlide key={`thumbnailKey${index}`}>
                <TrailerItem keyId={key} index={index}></TrailerItem>
              </SwiperSlide>
            );
          })}
        <NextBtn ref={nextRef} />
        <PrevBtn ref={prevRef} />
      </Swiper>
      {keys.length > 5 && (
        <div className="absolute top-[40px] right-[40px] inline-flex justify-center gap-2">
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
      )}
    </div>
  );
};

DetailTrailerSection.propTypes = {
  videosData: PropTypes.array.isRequired,
};

export default withErrorBoundary(DetailTrailerSection, {
  FallbackComponent: ErrorFallBack,
});
