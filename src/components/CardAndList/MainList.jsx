import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { useResponsive } from '~/hooks';
import FilmCard from './FilmCard';
import PersonCard from './PersonCard';

const MainList = ({
  listData = [],
  className = '',
  cardStyle = '',
  type = 'movie',
  loading = false,
}) => {
  const { isMobile, isTablet, isLaptop } = useResponsive();
  const numberOfCol = isLaptop ? 5 : isTablet ? 3 : 2;
  return (
    <div
      className={`grid gap-[16px] w-full ${className}`}
      style={{
        gridTemplateColumns: `repeat(${numberOfCol}, minmax(0, 1fr))`,
        ...cardStyle,
      }}
    >
      {!loading && listData && listData.length > 0 && (
        <Fragment>
          {(type === 'movie' || type === 'tv') &&
            listData.map((filmData, index) => (
              <FilmCard
                key={`filmCardKey${filmData.poster_path}${index}`}
                type={type}
                filmData={filmData}
              />
            ))}
          {type === 'person' &&
            listData.map((personData, index) => (
              <PersonCard
                key={`personCardKey${personData.poster_path}${index}`}
                personData={personData}
              />
            ))}
        </Fragment>
      )}
    </div>
  );
};

MainList.propTypes = {
  listData: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['movie', 'tv', 'person']).isRequired,
  className: PropTypes.string,
  cardStyle: PropTypes.string,
};

export { MainList };
