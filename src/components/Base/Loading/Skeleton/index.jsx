import React from 'react';
import styles from './LoadingSkeleton.module.css';

const LoadingSkeleton = ({ className, style }) => {
  return (
    <div
      className={
        className
          ? `${styles.loadingSkeleton} ${className}`
          : styles.loadingSkeleton
      }
      style={style ? style : {}}
    ></div>
  );
};

export default LoadingSkeleton;
