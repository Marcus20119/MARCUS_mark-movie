import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';

import CastCard from './CastCard';
import NextBtn from './NextBtn';
import PrevBtn from './PrevBtn';

const DetailCastsList = ({ castsData }) => {
  console.log('castsData', castsData);
  const nextRef = useRef();
  const prevRef = useRef();
  return (
    <div className="relative w-full px-[40px] pt-[40px] pb-[60px] bg-[#222222]">
      <h3 className="text-2xl text-white font-bold mb-3">Casts</h3>
      <Swiper
        grabCursor
        spaceBetween={16}
        slidesPerView="auto"
        className="detail-castList"
      >
        {castsData &&
          castsData.length &&
          castsData.length > 0 &&
          castsData.slice(0, 20).map((castData, index) => (
            <SwiperSlide key={`castDataKey${index}`}>
              <CastCard castData={castData} />
            </SwiperSlide>
          ))}
        <NextBtn ref={nextRef} />
        <PrevBtn ref={prevRef} />
      </Swiper>
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
    </div>
  );
};
DetailCastsList.propTypes = {
  castsData: PropTypes.array.isRequired,
};

export default DetailCastsList;
