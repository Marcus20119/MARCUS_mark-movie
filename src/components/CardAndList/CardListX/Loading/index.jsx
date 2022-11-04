import PropTypes from 'prop-types';
import MovieCardXLoading from '../../CardX/Loading';

const MovieCardListXLoading = ({ quantity = NaN }) => {
  return (
    <div className="flex flex-col w-full gap-[10px]">
      {Array(quantity)
        .fill('')
        .map((movieDataLoading, index) => (
          <MovieCardXLoading key={`cardListXLoading${index}`} />
        ))}
    </div>
  );
};

MovieCardListXLoading.propTypes = {
  quantity: PropTypes.number.isRequired,
};

export default MovieCardListXLoading;
