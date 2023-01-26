import PropTypes from 'prop-types';
import LoadingMovieCardX from './LoadingMovieCardX';

const LoadingMovieCardListX = ({ quantity = NaN }) => {
  return (
    <div className="flex flex-col w-full gap-[10px]">
      {Array(quantity)
        .fill('')
        .map((movieDataLoading, index) => (
          <LoadingMovieCardX key={`cardListXLoading${index}`} />
        ))}
    </div>
  );
};

LoadingMovieCardListX.propTypes = {
  quantity: PropTypes.number.isRequired,
};

export { LoadingMovieCardListX };
