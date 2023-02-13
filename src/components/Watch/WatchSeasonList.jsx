/* eslint-disable eqeqeq */
import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useMySWR } from '~/hooks';
import { api } from '~/utils';
import ProgressiveImg from '../Base/ProgressiveImg';
import WatchEpisode from './WatchEpisode';

const WatchSeasonList = ({ seasonNumber, seriesId, seasonRef }) => {
  const { myData, isLoading } = useMySWR({
    api: api.tv.getSeason(seriesId, seasonNumber),
    origin: true,
  });
  const { search } = useLocation();
  const { season, episode } = queryString.parse(search);
  const [show, setShow] = useState(seasonNumber == season);
  const handleToggle = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (seasonNumber == season) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [season, episode, seasonNumber]);

  useEffect(() => {
    if (seasonRef?.current?.firstChild) {
      const seasonNumber = Number(season);
      seasonRef.current.scrollTop =
        (22.5 + seasonRef.current.firstChild.firstChild.offsetHeight) *
        (seasonNumber - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seasonRef, isLoading, myData, season, episode]);
  return (
    <Fragment>
      {!isLoading && myData && (
        <div className="flex flex-col gap-3 w-full">
          <div
            className="flex gap-4 w-full opacity-100 hover:!opacity-70 cursor-pointer"
            onClick={handleToggle}
          >
            <div className="w-[30%]">
              <div className="relative w-full h-0 pt-[140%] rounded-md overflow-hidden">
                {myData.poster_path ? (
                  <ProgressiveImg
                    src={api.getPoster(myData.poster_path, 'w500')}
                    placeholderSrc={api.getPoster(myData.poster_path, 'w92')}
                    alt={myData.poster_path}
                    className="opacity-80"
                  />
                ) : (
                  <img
                    className="absolute inset-0 block w-full h-full object-cover object-center opacity-80"
                    src="/imgs/no-poster.jpg"
                    alt="no-poster"
                  />
                )}
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start py-1">
              <h5 className="text-lg font-bold line-clamp-2 mb-1 text-white80">
                {myData.name}
              </h5>
              <span className="text-base line-clamp-2 mb-1 text-white80 opacity-80">
                {myData.air_date}
              </span>
            </div>
          </div>
          <div
            className={`flex flex-col w-full gap-3 overflow-hidden transition-all ${
              show ? 'max-h-max' : 'max-h-0'
            }`}
          >
            {myData?.episodes &&
              myData.episodes.map((episodeData, index) => (
                <WatchEpisode
                  key={`season-${seasonNumber}-ep-${index + 1}`}
                  seriesId={seriesId}
                  seasonNumber={seasonNumber}
                  episodeNumber={index + 1}
                  episodeData={episodeData}
                />
              ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export { WatchSeasonList };
