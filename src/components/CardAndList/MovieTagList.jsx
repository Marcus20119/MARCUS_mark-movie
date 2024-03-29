import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const MovieTagList = ({
  movieData,
  genresData,
  numberOfTag = 3,
  disabled = false,
  className = '',
  category = 'movie',
  size = 'normal',
  hidden = true,
  handleHoverTag = () => {},
  handleUnHoverTag = () => {},
}) => {
  const navigateTo = useNavigate();
  let sizeClassName = '';
  if (size === 'normal') {
    sizeClassName = 'px-[11px] py-[8px] text-[0.65rem] leading-[0.75rem]';
  } else if (size === 'large') {
    sizeClassName =
      'px-[13px] py-[10px] text-[0.75rem] leading-[0.85rem] -translate-y-1';
  }
  return (
    <div
      className={`flex flex-wrap justify-start items-center gap-[0.5rem] mb-[1.5rem] max-h-[30px] ${
        hidden ? 'overflow-hidden' : ''
      } ${className}`}
    >
      {movieData &&
        movieData.genre_ids &&
        movieData.genre_ids.slice(0, numberOfTag).map(id => (
          <button
            key={`genres${id}`}
            className={`${sizeClassName} border border-white rounded-md opacity-70 hover:!text-white ${
              disabled ? '' : 'hover:opacity-100'
            }`}
            disabled={disabled}
            href={`/discover?category=${category}&with_genres=${id}&page=1`}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              navigateTo(
                `/discover?category=${category}&with_genres=${id}&page=1`
              );
            }}
            onMouseOver={handleHoverTag}
            onMouseLeave={handleUnHoverTag}
          >
            {genresData.find(genre => genre.id === id) &&
              genresData.find(genre => genre.id === id).name}
          </button>
        ))}
      {movieData &&
        movieData?.genres &&
        movieData.genres.map(genre => (
          <a
            key={`genres${genre.id}`}
            className={`${sizeClassName} border border-white rounded-md opacity-70 hover:!text-white ${
              disabled ? '' : 'hover:opacity-100'
            }`}
            disabled={disabled}
            href={`/discover?category=${category}&with_genres=${genre.id}&page=1`}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              navigateTo(
                `/discover?category=${category}&with_genres=${genre.id}&page=1`
              );
            }}
            onMouseOver={handleHoverTag}
            onMouseLeave={handleUnHoverTag}
          >
            {genre.name}
          </a>
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
  size: PropTypes.oneOf(['normal', 'large']),
};

export { MovieTagList };
