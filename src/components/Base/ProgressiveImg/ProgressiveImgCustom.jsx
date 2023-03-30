import { useState, useEffect } from 'react';
import LoadingSkeleton from '../Loading/Skeleton';
import './ProgressiveImg.scss';

const ProgressiveImgCustom = ({
  placeholderSrc,
  src,
  className,
  alt,
  resetClassName = false,
  skeleton = true,
}) => {
  const [imgSrc, setImgSrc] = useState(skeleton ? '' : placeholderSrc || src);

  // Nếu có placeholderSrc và nó load xong thì set ảnh = placeholderSrc
  useEffect(() => {
    if (placeholderSrc) {
      const img = new Image();
      img.src = placeholderSrc;
      img.onload = () => {
        setImgSrc(placeholderSrc);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Nếu src load xong thì set ảnh = src
  useEffect(() => {
    if (imgSrc !== src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImgSrc(src);
      };
    }
  }, [src, imgSrc]);

  // Xử lý hiệu ứng ảnh bằng class
  const customClass =
    placeholderSrc && imgSrc === placeholderSrc
      ? 'ProgressiveImgCustom-loading'
      : imgSrc === src
      ? 'ProgressiveImgCustom-loaded'
      : '';

  return (
    <>
      {/* Nếu chưa load được placeholderSrc thì hiện loading skeleton */}
      {skeleton && (
        <LoadingSkeleton
          className={`opacity-80 ${
            resetClassName
              ? ''
              : 'absolute inset-0 block w-full h-full object-cover object-center'
          } ${className}`}
          style={{
            animation: !imgSrc ? '' : 'fadeOut 0.2s linear forwards',
          }}
        />
      )}
      {imgSrc && (
        <img
          src={imgSrc}
          alt={alt || ''}
          className={`ProgressiveImgCustom imgMobile ${
            resetClassName
              ? ''
              : 'absolute inset-0 block w-full h-full object-cover object-center'
          } ${className} ${customClass}`}
          style={{
            animation: skeleton ? 'fadeIn 0.2s linear forwards' : '',
          }}
        />
      )}
    </>
  );
};
export { ProgressiveImgCustom };
