import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const WatchTagList = ({ movieData, category = 'movie' }) => {
  return (
    <div className="flex flex-wrap justify-start items-center gap-[0.5rem] mb-0 mt-3 max-h-[30px]">
      {movieData &&
        movieData?.genres &&
        movieData.genres.map(genre => (
          <Link
            key={`genres${genre.id}`}
            className="px-[12px] py-[8px] text-[0.75rem] leading-[0.85rem] -translate-y-1 rounded-full bg-[#393939] opacity-70 text-white80 hover:!text-white hover:opacity-100"
            to={`/discover?category=${category}&with_genres=${genre.id}&page=1`}
          >
            {genre.name}
          </Link>
        ))}
    </div>
  );
};

WatchTagList.propTypes = {
  movieData: PropTypes.any.isRequired,
  genresData: PropTypes.array,
  numberOfTag: PropTypes.number,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(['normal', 'large']),
};

export { WatchTagList };
