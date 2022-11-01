import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import NextBtn from '~/components/Base/Swiper/NextBtn';
import PrevBtn from '~/components/Base/Swiper/PrevBtn';
import { api } from '~/config';

const DetailTrailerThumbnail = ({ videosData }) => {
  const keys = videosData.map(videoData => videoData.key);
  console.log('keys', keys);
  const nextRef = useRef();
  const prevRef = useRef();
  return (
    <div className="relative w-full px-[30px] pt-[30px] pb-[60px] bg-[#222222]">
      <h3 className="text-2xl text-white font-bold mb-3">Trailer</h3>
      <Swiper spaceBetween={16} slidesPerView="auto" className="detail-trailer">
        {keys &&
          keys.length &&
          keys.length > 0 &&
          keys.slice(0, 20).map((key, index) => (
            <SwiperSlide key={`thumbnailKey${index}`}>
              <div className="group relative w-full h-0 pt-[60%] overflow-hidden border-[2px] rounded-sm border-solid border-[#222222] hover:border-[var(--primary-color)] cursor-pointer">
                <img
                  className="absolute left-0 top-1/2 block w-full h-full object-cover object-center -translate-y-1/2"
                  src={api.getThumbnail(key)}
                  alt={`thumbnailKey${index}`}
                />
                <img
                  className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 hidden w-[45px] h-[45px] opacity-70 object-center object-cover group-hover:block"
                  src="/small-round-play-button.png"
                  alt="play icon"
                />
              </div>
            </SwiperSlide>
          ))}
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

export default DetailTrailerThumbnail;
