import { forwardRef } from 'react';
import { useSwiper } from 'swiper/react';

const PrevBtn = (props, ref) => {
  const swiper = useSwiper();

  return (
    <button
      ref={ref}
      onClick={() => swiper.slidePrev()}
      style={{ display: 'none' }}
    ></button>
  );
};

export default forwardRef(PrevBtn);
