import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { api } from '~/config';

const RecommendList = ({
  recommendsData = [],
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
      {recommendsData &&
        recommendsData.length > 0 &&
        recommendsData.map((recommendData, index) => (
          <Link
            key={`recommendCardKey${recommendData.poster_path}${index}`}
            to={`/details/${type}/${recommendData.id}`}
            className="group w-full cursor-pointer rounded-md"
          >
            <div className="relative w-full h-0 pt-[145%] rounded-md overflow-hidden group-hover:-translate-y-2">
              <img
                className="absolute inset-0 block w-full object-cover object-center"
                src={
                  recommendData.poster_path
                    ? api.getPoster(recommendData.poster_path)
                    : '/no-poster.jpg'
                }
                alt={recommendData.poster_path}
              />
            </div>
            <h6 className="text-center text-white my-[10px] text-[1.1rem]">
              {recommendData.title}
            </h6>
          </Link>
        ))}
    </div>
  );
};

RecommendList.propTypes = {
  recommendsData: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['movie', 'tv']).isRequired,
  numberOfCol: PropTypes.number,
  className: PropTypes.string,
  cardStyle: PropTypes.string,
};

export default RecommendList;
