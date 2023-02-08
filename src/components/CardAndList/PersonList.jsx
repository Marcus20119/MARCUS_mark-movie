import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { api, route } from '~/utils';
import ProgressiveImg from '../Base/ProgressiveImg';

const PersonList = ({
  peopleData = [],
  numberOfCol = 5,
  className = '',
  cardStyle = '',
}) => {
  return (
    <div
      className={`grid gap-[16px] w-full ${className}`}
      style={{
        gridTemplateColumns: `repeat(${numberOfCol}, minmax(0, 1fr))`,
        ...cardStyle,
      }}
    >
      {peopleData &&
        peopleData.length > 0 &&
        peopleData.map((peopleData, index) => (
          <Link
            key={`filmCardKey${peopleData.poster_path}${index}`}
            to={route.toDetail('person', peopleData.id)}
            className="group w-full cursor-pointer rounded-md"
          >
            <div className="relative w-full h-0 bg-transparent pt-[145%] rounded-md overflow-hidden group-hover:-translate-y-2">
              {peopleData?.profile_path ? (
                <ProgressiveImg
                  src={api.getPoster(peopleData.profile_path, 'h632')}
                  placeholderSrc={api.getPoster(peopleData.profile_path, 'w45')}
                  alt={peopleData.profile_path}
                />
              ) : (
                <img
                  className="absolute inset-0 block w-full h-full object-cover object-center"
                  src="/imgs/no-user.png"
                  alt="no-poster"
                />
              )}
            </div>
            <h6 className="text-center text-white my-[10px] text-[1.1rem]">
              {peopleData.name}
            </h6>
          </Link>
        ))}
    </div>
  );
};

PersonList.propTypes = {
  peopleData: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['movie', 'tv']).isRequired,
  numberOfCol: PropTypes.number,
  className: PropTypes.string,
  cardStyle: PropTypes.string,
};

export { PersonList };
