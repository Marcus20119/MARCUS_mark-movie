import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ButtonPlay from '~/components/Common/Button/Play';
import ButtonPlus from '~/components/Common/Button/Plus';
import MovieTagList from '~/components/Common/Movie/TagList';
import { api } from '~/config';
import useMySWR from '~/hooks/useMySWR';

const DetailMovie = () => {
  const { id } = useParams();
  const { myData: movieData, isLoading: movieLoading } = useMySWR({
    api: api.getDetail(id, 'movie'),
  });
  console.log('movieData', movieData);
  const subInfo = [
    {
      title: 'PRODUCTION COMPANY',
      content: movieData?.production_companies?.[0]?.name || 'Unknown',
    },
    {
      title: 'COUNTRIES',
      content: movieData?.production_countries
        ? movieData.production_countries
            .map(country => country.iso_3166_1)
            .join(', ')
        : 'Unknown',
    },
    {
      title: 'RELEASE DATE',
      content: movieData.release_date || 'Unknown',
    },
  ];
  console.log('subInfo', subInfo);
  return (
    <Fragment>
      {!movieLoading && movieData.backdrop_path && (
        <Fragment>
          <div
            className="block w-full h-[500px] object-top backdrop-blur-3xl opacity-50 bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(0deg, rgb(34, 34, 34, 0.85), transparent), url('${api.getBackdrop(
                movieData.backdrop_path
              )}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
          ></div>
          <div className="flex w-full items-start justify-between gap-5 -translate-y-[250px] px-[40px]">
            <div className="flex flex-col gap-[20px] w-[20%]">
              <img
                className="w-full object-contain rounded-sm"
                src={api.getPoster(movieData.poster_path)}
                alt={movieData.title}
              />
              <ButtonPlay
                message="Watch now"
                displayIcon={true}
                widthType="full"
                className="!rounded-md"
              />
            </div>
            <div className="flex-1 flex flex-col items-start text-white">
              <div className="h-[250px] w-full py-[10px]">
                <h1 className="text-5xl font-merri mb-2">{movieData.title}</h1>
                <h3 className="text-lg text-[#b5b5b5] mb-[28px]">{`${movieData.tagline}`}</h3>
                <h4 className="mb-[12px]">{`${Math.floor(
                  movieData.runtime / 60
                )} h ${movieData.runtime % 60} mins`}</h4>
                <div className="flex justify-start items-center gap-2 h-[20px] mb-[16px]">
                  <img
                    className="block h-full object-contain object-center"
                    src="/IMDb.png"
                    alt="IMDb"
                  />
                  <span className="font-semibold">
                    {parseFloat(movieData.vote_average).toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="inline-flex justify-start items-center gap-[12px]">
                    <button className="inline-flex justify-start items-center gap-[10px] bg-[#3E56C4] px-[16px] py-[8px] rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8.615v-6.96h-2.338v-2.725h2.338v-2c0-2.325 1.42-3.592 3.5-3.592.699-.002 1.399.034 2.095.107v2.42h-1.435c-1.128 0-1.348.538-1.348 1.325v1.735h2.697l-.35 2.725h-2.348V21H20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"></path>
                      </svg>
                      <span>Share</span>
                    </button>
                    <ButtonPlus
                      padding={12}
                      iconSize={16}
                      buttonClass="!rounded-md"
                    />
                  </div>
                  <MovieTagList movieData={movieData} className="!mb-0" />
                </div>
              </div>
              <div className="flex flex-col justify-start items-start">
                <div className="flex flex-col justify-start items-start gap-[8px]"></div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default DetailMovie;
