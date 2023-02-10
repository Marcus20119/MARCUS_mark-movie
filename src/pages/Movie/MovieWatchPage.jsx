import { useParams } from 'react-router-dom';
import { SearchBar } from '~/components/Bar';
import { WatchRecommendList } from '~/components/CardAndList';
import { useMySWR, useScrollOnTop, useSearch } from '~/hooks';
import { api } from '~/utils';

const MovieWatchPage = () => {
  const { id } = useParams();
  useScrollOnTop(id);
  const { input, handleSetInput, isFocus, setIsFocus } = useSearch();

  const { myData: movieData, isLoading: movieLoading } = useMySWR({
    api: api.getDetail(id, 'movie'),
  });
  const { myData: recommendList, isLoading: recommendListLoading } = useMySWR({
    api: api.getRecommend(id, 'movie'),
    max: 5,
  });

  return (
    <div className="flex w-full">
      <div className="w-[70%] my-10 mx-4">
        <div className="relative w-full h-0 pb-[56.25%] rounded-md overflow-hidden">
          <iframe
            src={`https://2embed.org/embed/movie?tmdb=${id}`}
            frameborder="0"
            title={id}
            className="absolute w-full h-full top-0 left-0"
            allowfullscreen="true"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            scrolling="no"
          ></iframe>
        </div>
        {movieData && (
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
            <div className="flex flex-col gap-1 mt-3">
              <span className="text-white80 font-bold text-lg">Overview:</span>
              <p className="text-[#b5b5b5] opacity-80">{movieData.overview}</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-4 m-4">
        <SearchBar
          input={input}
          handleSetInput={handleSetInput}
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          placeholder="Search . . ."
          type="2"
        />
        {!recommendListLoading && (
          <WatchRecommendList recommendList={recommendList} />
        )}
      </div>
    </div>
  );
};

export default MovieWatchPage;
