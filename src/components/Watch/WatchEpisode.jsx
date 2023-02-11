/* eslint-disable eqeqeq */
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { api } from '~/utils';
import ProgressiveImg from '../Base/ProgressiveImg';

const WatchEpisode = ({
  seriesId,
  seasonNumber,
  episodeNumber,
  episodeData,
}) => {
  const { search } = useLocation();
  const { season, episode } = queryString.parse(search);
  return (
    <Link
      to={`/tv/watch/${seriesId}?season=${seasonNumber}&episode=${episodeNumber}`}
      className={`group flex items-center gap-4  ${
        episodeNumber == episode && seasonNumber == season
          ? '!opacity-100'
          : 'opacity-80'
      } hover:!opacity-100`}
    >
      <span
        className={` font-bold text-lg w-[28px] px-2 ${
          episodeNumber == episode && seasonNumber == season
            ? '!text-primary'
            : 'text-white80'
        } group-hover:text-primary`}
      >
        {episodeData.episode_number}
      </span>
      <div className="w-[30%]">
        <div className="relative w-full h-0 pt-[70%] rounded-md overflow-hidden">
          {episodeData.still_path ? (
            <ProgressiveImg
              src={api.getBackdrop(episodeData.still_path, 'w185')}
              placeholderSrc={api.getBackdrop(episodeData.still_path, 'w92')}
              alt={episodeData.still_path}
              className="opacity-80"
            />
          ) : (
            <img
              className="absolute inset-0 block w-full h-full object-cover object-center opacity-80"
              src="/imgs/video-default.jpg"
              alt="no-poster"
            />
          )}
        </div>
      </div>
      <span
        className={`flex-1 line-clamp-2 ${
          episodeNumber == episode && seasonNumber == season
            ? '!text-primary !opacity-100'
            : 'text-white opacity-60'
        } group-hover:!text-primary group-hover:!opacity-100`}
      >
        {episodeData.name}
      </span>
    </Link>
  );
};

export default WatchEpisode;
