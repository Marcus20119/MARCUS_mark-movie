import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { api } from '~/config';
import { route } from '~/config/configRoute';

const FilmList = ({
  filmsData = [],
  numberOfCol = 5,
  className = '',
  cardStyle = '',
  type = 'movie',
}) => {
  return (
    <div
      className={`grid gap-[16px] w-full ${className}`}
      style={{
        gridTemplateColumns: `repeat(${numberOfCol}, minmax(0, 1fr))`,
        ...cardStyle,
      }}
    >
      {filmsData &&
        filmsData.length > 0 &&
        filmsData.map((filmData, index) => (
          <Link
            key={`filmCardKey${filmData.poster_path}${index}`}
            to={route.toDetail(type, filmData.id)}
            className="group w-full cursor-pointer rounded-md"
          >
            <div className="relative w-full h-0 pt-[145%] rounded-md overflow-hidden group-hover:-translate-y-2">
              <img
                className="absolute inset-0 block w-full object-cover object-center"
                src={
                  filmData.poster_path
                    ? api.getPoster(filmData.poster_path)
                    : '/imgs/no-poster.jpg'
                }
                alt={filmData.poster_path}
              />
            </div>
            <h6 className="text-center text-white my-[10px] text-[1.1rem]">
              {filmData.title || filmData.name}
            </h6>
          </Link>
        ))}
    </div>
  );
};

FilmList.propTypes = {
  filmsData: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['movie', 'tv']).isRequired,
  numberOfCol: PropTypes.number,
  className: PropTypes.string,
  cardStyle: PropTypes.string,
};

export default FilmList;
