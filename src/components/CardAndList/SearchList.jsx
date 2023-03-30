import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { useResponsive } from '~/hooks';
import FilmCard from './FilmCard';
import PersonCard from './PersonCard';

const SearchList = ({
  searchData = [],
  className = '',
  cardStyle = '',
  loading = false,
}) => {
  const { isTablet, isLaptop } = useResponsive();
  const numberOfCol = isLaptop ? 5 : isTablet ? 3 : 2;

  return (
    <div
      className={`grid gap-[16px] w-full ${className}`}
      style={{
        gridTemplateColumns: `repeat(${numberOfCol}, minmax(0, 1fr))`,
        ...cardStyle,
      }}
    >
      {!loading &&
        searchData &&
        searchData.length > 0 &&
        searchData.map((itemData, index) => (
          <Fragment key={`filmCardWrap${itemData.id}${index}`}>
            {(itemData.media_type === 'movie' ||
              itemData.media_type === 'tv') && (
              <FilmCard type={itemData.media_type} filmData={itemData} />
            )}
            {itemData.media_type === 'person' && (
              <PersonCard personData={itemData} />
            )}
          </Fragment>
        ))}
    </div>
  );
};

SearchList.propTypes = {
  searchData: PropTypes.array.isRequired,
  className: PropTypes.string,
  cardStyle: PropTypes.string,
};

export { SearchList };
