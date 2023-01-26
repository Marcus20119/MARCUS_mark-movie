import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const MovieTagList = ({
  movieData,
  genresData,
  numberOfTag = 3,
  disabled = false,
  className = '',
  category = 'movie',
}) => {
  const navigateTo = useNavigate();
  return (
    <div
      className={`flex flex-wrap justify-start items-center gap-[0.5rem] mb-[1.5rem] max-h-[30px] overflow-hidden ${className}`}
    >
      {movieData &&
        movieData.genre_ids &&
        movieData.genre_ids.slice(0, numberOfTag).map(id => (
          <button
            key={`genres${id}`}
            className={`px-[11px] py-[8px] border border-white text-[0.65rem] leading-[0.75rem] rounded-md opacity-70 ${
              disabled ? '' : 'hover:opacity-100'
            }`}
            disabled={disabled}
            onClick={() => {
              navigateTo(
                `/discover?category=${category}&with_genres=${id}&page=1`
              );
            }}
          >
            {genresData.find(genre => genre.id === id) &&
              genresData.find(genre => genre.id === id).name}
          </button>
        ))}
      {movieData &&
        movieData?.genres &&
        movieData.genres.map(genre => (
          <button
            key={`genres${genre.id}`}
            className={`px-[11px] py-[8px] border border-white text-[0.65rem] leading-[0.75rem] rounded-md opacity-70 ${
              disabled ? '' : 'hover:opacity-100'
            }`}
            disabled={disabled}
            onClick={() => {
              navigateTo(
                `/discover?category=${category}&with_genres=${genre.id}&page=1`
              );
            }}
          >
            {genre.name}
          </button>
        ))}
    </div>
  );
};

MovieTagList.propTypes = {
  movieData: PropTypes.any.isRequired,
  genresData: PropTypes.array,
  numberOfTag: PropTypes.number,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export { MovieTagList };
