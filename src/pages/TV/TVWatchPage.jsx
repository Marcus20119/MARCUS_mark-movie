import { Fragment, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import queryString from 'query-string';
import { SuggestionSearchBar } from '~/components/Bar';
import {
  useChangeTitleWebsite,
  useMySWR,
  useResponsive,
  useScrollOnTop,
} from '~/hooks';
import { api } from '~/utils';
import {
  LoadingWatch,
  WatchSeasonList,
  WatchTagList,
} from '~/components/Watch';

const TVWatchPage = () => {
  const { id } = useParams();
  useScrollOnTop(id);
  const { search } = useLocation();
  useScrollOnTop(search);
  const { season, episode, query } = queryString.parse(search);

  const seasonRef = useRef();
  const { myData: movieData, isLoading: movieLoading } = useMySWR({
    api: api.getDetail(id, 'tv'),
  });

  const [newQuery, setNewQuery] = useState(query);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (newQuery) {
      navigateTo(`/search?query=${newQuery}&page=1`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newQuery]);

  useChangeTitleWebsite({
    title: movieData?.name ? `${movieData.name} - S${season}E${episode}` : '',
    rerenderCondition: [movieData, season, episode],
  });

  const { isTablet, isLaptop } = useResponsive();

  return (
    <Fragment>
      {!movieLoading && movieData ? (
        <div className={`flex w-full ${!isLaptop && 'flex-col'}`}>
          <div className={`my-10 px-4 ${isLaptop ? 'w-[70%]' : 'w-full'}`}>
            {isTablet && (
              <div className="flex items-center gap-4 w-full mb-4 pl-4">
                <div className="font-bold text-2xl tracking-wider text-white hover:text-white">
                  TV Show
                </div>
                <div className="flex-1">
                  <SuggestionSearchBar
                    typeQuery="multi"
                    query={query}
                    setNewQuery={setNewQuery}
                    placeholder="Search . . ."
                  />
                </div>
              </div>
            )}
            <div className="relative w-full h-0 pb-[56.25%] rounded-md overflow-hidden bg-[#ffffff20]">
              <iframe
                src={`https://www.2embed.to/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`}
                frameBorder="0"
                title={id}
                className="absolute w-full h-full top-0 left-0"
                allowFullScreen={true}
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                scrolling="no"
              ></iframe>
            </div>

            <div className="flex flex-col mt-3">
              <h1 className="text-4xl font-merri mb-0 leading-[3.7rem] line-clamp-1 text-white80">
                {movieData.title || movieData.name}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-[6px]">
                  <i className="bx bxs-star flex justify-center items-center text-2xl !text-primary"></i>
                  <span className="text-white80 text-lg translate-y-[2px] opacity-60">
                    {parseFloat(movieData.vote_average).toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <i className="bx bx-calendar flex justify-center items-center text-2xl !text-primary"></i>
                  <span className="text-white80 text-lg translate-y-[2px] opacity-60">
                    {movieData.release_date || movieData.first_air_date
                      ? new Date(
                          movieData.release_date || movieData.first_air_date
                        ).getFullYear()
                      : 'Unknown year'}
                  </span>
                </div>
              </div>
              <WatchTagList movieData={movieData} category={'tv'} />
              <div className="flex flex-col gap-1 mt-3">
                <span className="text-white80 font-bold text-lg">
                  Overview:
                </span>
                <p className="text-[#b5b5b5] opacity-80">
                  {movieData.overview}
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4 h-full mx-4 py-4">
            {isLaptop && (
              <SuggestionSearchBar
                typeQuery="multi"
                query={query}
                setNewQuery={setNewQuery}
                placeholder="Search . . ."
              />
            )}
            <div className="flex-1 flex flex-col w-full gap-4">
              <h3 className="text-2xl text-white font-bold">Seasons</h3>
              <div
                ref={seasonRef}
                className={`custom-scrollbar2 flex flex-col gap-2 w-full max-h-[120vh] ${
                  isLaptop && 'overflow-y-auto scrollbar-hide'
                }`}
              >
                {movieData &&
                  movieData.number_of_seasons &&
                  Array(movieData.number_of_seasons)
                    .fill('')
                    .map((item, index) => (
                      <WatchSeasonList
                        key={`seasonNumber-${index + 1}`}
                        seasonNumber={index + 1}
                        seriesId={id}
                        seasonRef={seasonRef}
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingWatch />
      )}
    </Fragment>
  );
};

export default TVWatchPage;
