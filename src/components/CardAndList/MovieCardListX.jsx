import PropTypes from 'prop-types';

import MovieCardX from './MovieCardX';

const MovieCardListX = ({
  moviesData,
  quantity = NaN,
  type,
  isSearch = false,
}) => {
  return (
    <div className="flex flex-col w-full gap-[10px]">
      {moviesData &&
        moviesData.length &&
        moviesData.length > 0 &&
        (quantity
          ? moviesData
              .slice(0, quantity)
              .map(movieData => (
                <MovieCardX
                  key={`cardListX${movieData.id}`}
                  movieData={movieData}
                  type={type}
                  isSearch={isSearch}
                />
              ))
          : moviesData.map(movieData => (
              <MovieCardX
                key={`cardListX${movieData.id}`}
                movieData={movieData}
                type={type}
                isSearch={isSearch}
              />
            )))}
    </div>
  );
};

MovieCardListX.propTypes = {
  moviesData: PropTypes.any.isRequired,
  quantity: PropTypes.number,
  type: PropTypes.oneOf(['movie', 'tv']).isRequired,
};

export { MovieCardListX };
