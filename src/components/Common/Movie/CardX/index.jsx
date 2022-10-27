import PropTypes from 'prop-types';
import { api, genres } from '~/config';

const MovieCardX = ({ movieData, type = 'movie' }) => {
  const { poster_path, vote_average } = movieData;
  let neededGenres;
  switch (type) {
    case 'movie':
      neededGenres = genres.movie;
      break;
    case 'tv': {
      neededGenres = genres.tv;
      break;
    }
    default:
      break;
  }
  return (
    <div className="flex gap-[10px] w-full p-[10px] rounded-xl bg-[rgba(255,_255,_255,_0.06)] text-white">
      <div className="relative w-[40%] pt-[40%] rounded-lg overflow-hidden">
        <img
          className="absolute w-full inset-0 block object-cover object-center"
          src={api.getPoster(poster_path)}
          alt=""
        />
      </div>
      <div className="flex flex-1 flex-col justify-center items-start">
        <h5 className="w-full font-bold line-clamp-1 mb-1">
          {movieData.title || movieData.name}
        </h5>
        <div className="w-full flex justify-between items-center text-xs mb-2">
          <span>
            {new Date(
              movieData.release_date || movieData.first_air_date
            ).getFullYear()}
          </span>
          <div className="inline-flex gap-1">
            <span>{vote_average}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="w-4 h-4"
            >
              <path
                d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"
                fill="#FFAA01"
              ></path>
            </svg>
          </div>
        </div>
        <div className="carousel-caption__tag-wrap">
          {movieData.genre_ids &&
            movieData.genre_ids.slice(0, 2).map(id => (
              <button key={`genres${id}`} className="carousel-caption__tag">
                {neededGenres.find(genre => genre.id === id) &&
                  neededGenres.find(genre => genre.id === id).name}
              </button>
            ))}
        </div>
        {/* <ButtonPlay message="Watch" widthType="full" /> */}
      </div>
    </div>
  );
};

MovieCardX.propTypes = {
  movieData: PropTypes.object.isRequired,
};

export default MovieCardX;
