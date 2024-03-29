import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useResponsive } from '~/hooks';
import { api, route } from '~/utils';
import { ProgressiveImgCustom } from '../Base/ProgressiveImg';

const WatchRecommendList = ({ recommendList }) => {
  const { isTablet } = useResponsive();
  return (
    <div className="flex flex-col w-full gap-4">
      <h3 className="text-2xl text-white font-bold">Recommend</h3>
      {recommendList.map((movieData, index) => (
        <Link
          key={`movieWatchRecommend-${index}`}
          to={route.toDetail('movie', movieData.id)}
          className="flex gap-4 w-full opacity-100 hover:!opacity-70"
        >
          <div className="w-[30%]">
            <div className="relative w-full h-0 pt-[140%] rounded-md overflow-hidden">
              {movieData.poster_path ? (
                <ProgressiveImgCustom
                  src={api.getPoster(movieData.poster_path, 'w500')}
                  placeholderSrc={api.getPoster(movieData.poster_path, 'w92')}
                  alt={movieData.poster_path}
                />
              ) : (
                <img
                  className="absolute inset-0 block w-full h-full object-cover object-center"
                  src="/imgs/no-poster.jpg"
                  alt="no-poster"
                />
              )}
            </div>
          </div>
          <div className="flex-1 flex flex-col  items-start py-1">
            <h5 className="text-lg font-bold line-clamp-2 mb-1 text-white80">
              {movieData.title}
            </h5>
            <span className="text-base line-clamp-2 mb-1 text-white80 opacity-80">
              {movieData.release_date}
            </span>
            {isTablet && (
              <Fragment>
                <span className="text-white80 font-bold text-lg mt-2">
                  Overview:
                </span>
                <p className="flex-1 text-white80 opacity-60 overflow-auto scrollbar-hide">
                  {movieData.overview}
                </p>
              </Fragment>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export { WatchRecommendList };
