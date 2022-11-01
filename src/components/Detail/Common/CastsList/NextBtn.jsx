import { forwardRef } from 'react';
import { useSwiper } from 'swiper/react';

const NextBtn = (props, ref) => {
  const swiper = useSwiper();

  return (
    <button
      ref={ref}
      onClick={() => swiper.slideNext()}
      style={{ display: 'none' }}
    ></button>
  );
};

export default forwardRef(NextBtn);
