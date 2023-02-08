import { useState, useEffect } from 'react';
import './ProgressiveImg.scss';

const ProgressiveImg = ({
  placeholderSrc,
  src,
  className,
  alt,
  resetClassName = false,
}) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  const customClass =
    placeholderSrc && imgSrc === placeholderSrc
      ? 'progressiveImg-loading'
      : 'progressiveImg-loaded';

  return (
    <img
      src={imgSrc}
      alt={alt || ''}
      className={`progressiveImg ${
        resetClassName
          ? ''
          : 'absolute inset-0 block w-full h-full object-cover object-center'
      } ${className} ${customClass}`}
    />
  );
};
export default ProgressiveImg;
