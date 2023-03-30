import { useState, useEffect } from 'react';
import './ProgressiveImg.scss';

const ProgressiveImgOriginal = ({
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
      ? 'progressiveImgOriginal-loading'
      : 'progressiveImgOriginal-loaded';

  return (
    <img
      src={imgSrc}
      alt={alt || ''}
      className={`progressiveImgOriginal imgMobile ${
        resetClassName
          ? ''
          : 'absolute inset-0 block w-full h-full object-cover object-center'
      } ${className} ${customClass}`}
    />
  );
};
export { ProgressiveImgOriginal };
